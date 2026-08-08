/**
 * legacy.routes.ts
 *
 * Routes that were in the original monolithic server.ts and are still
 * required by the frontend. Mounted at /api/v1 in entrypoint/server.ts.
 *
 * Routes included:
 *  POST /datasets/demo/:userId        — load packaged demo CSV from ML engine
 *  POST /optimization/jobs            — submit async optimization job
 *  GET  /optimization/jobs/:id        — poll optimization job status
 *  POST /parse-goal                   — proxy goal text → ML engine parser
 *  POST /qc/summary                   — QC summary stats
 *  POST /qc/control-chart             — SPC control chart data
 *  POST /qc/capability                — process capability analysis
 *  POST /qc/acceptance-sampling       — acceptance sampling plan
 *  GET  /dashboard                    — user dashboard metrics
 */

import { Router } from 'express';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import csv from 'csv-parser';
import axios from 'axios';
import { requireAuth } from '../middleware/auth';
import { saveDataset, getDataset } from '../data/datasetStore';
import { saveOptimization } from '../data/optimizationStore';
import { prisma } from '../lib/prisma';
import { logAuditEvent } from '../services/audit.service';
import {
  createOptimizationJobDb,
  getOptimizationJobDb,
  updateOptimizationJobDb,
} from '../db/optimizationJobs';
import { updateProject } from '../db/projects';
import { getDashboardMetrics } from '../data/dashboardData';

const router = Router();

const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://127.0.0.1:8000';
const ML_INTERNAL_API_KEY = process.env.ML_INTERNAL_API_KEY || '';

function mlHeaders(): Record<string, string> {
  return ML_INTERNAL_API_KEY ? { 'X-Modliq-Service-Key': ML_INTERNAL_API_KEY } : {};
}

// ─── Rate limiter ───────────────────────────────────────────────────────────
const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '120', 10);
const rateLimitHits = new Map<string, number[]>();

function rateLimit(req: any, res: any, next: any) {
  const key = req.user?.userId || req.ip || 'anon';
  const now = Date.now();
  const hits = (rateLimitHits.get(key) || []).filter((t) => now - t < rateLimitWindow);
  hits.push(now);
  rateLimitHits.set(key, hits);
  if (hits.length > rateLimitMax) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }
  next();
}

// ─── Storage helpers ─────────────────────────────────────────────────────────
const isProduction = process.env.NODE_ENV === 'production';
const uploadDir = isProduction
  ? path.join('/tmp/modliq', 'uploads')
  : path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function computeAnalyticsStatic(rows: any[]) {
  if (!rows.length) return { totalRows: 0, totalColumns: 0, missingValues: 0, numericColumns: [], categoricalColumns: [] };
  const headers = Object.keys(rows[0]);
  let missingValues = 0;
  const columnTypes: Record<string, string> = {};
  for (const col of headers) {
    let isNumeric = false;
    for (const row of rows) {
      const v = row[col];
      if (v === null || v === undefined || v === '') { missingValues++; continue; }
      if (!isNaN(Number(v))) { isNumeric = true; break; }
    }
    columnTypes[col] = isNumeric ? 'numeric' : 'categorical';
  }
  return {
    totalRows: rows.length,
    totalColumns: headers.length,
    missingValues,
    numericColumns: Object.keys(columnTypes).filter((c) => columnTypes[c] === 'numeric'),
    categoricalColumns: Object.keys(columnTypes).filter((c) => columnTypes[c] === 'categorical'),
  };
}

function findFileInUploads(filename: string): string | null {
  const direct = path.join(uploadDir, filename);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  try {
    const entries = fs.readdirSync(uploadDir, { recursive: true });
    for (const entry of entries) {
      if (typeof entry !== 'string') continue;
      const full = path.join(uploadDir, entry);
      if (!fs.statSync(full).isFile()) continue;
      const base = path.basename(full);
      if (base === filename || base.startsWith(`${filename}_`)) return full;
    }
  } catch {}
  return null;
}

async function resolveOptimizationFile(filename: string): Promise<{ localPath: string; dataset: any } | null> {
  const dataset = await getDataset(filename);
  let localPath = dataset?.filePath;
  const stat = localPath && fs.existsSync(localPath) && fs.statSync(localPath).isFile() ? fs.statSync(localPath) : null;
  if (!stat) {
    localPath = findFileInUploads(filename);
  }
  if (!localPath) return null;
  try {
    const realUpload = fs.realpathSync(uploadDir);
    const realResolved = fs.realpathSync(localPath);
    if (!realResolved.startsWith(realUpload)) return null;
  } catch { return null; }
  return { localPath, dataset };
}

// ─── Demo Dataset ─────────────────────────────────────────────────────────────
router.post('/datasets/demo/:userId', requireAuth, async (req, res) => {
  const userId = req.params.userId as string;

  let fetched: { buffer: Buffer; contentType: string } | null = null;
  try {
    const resp = await axios.get(`${ML_ENGINE_URL}/demo-dataset`, {
      timeout: 15000,
      headers: mlHeaders(),
      responseType: 'arraybuffer',
    });
    if (resp.status === 200 && resp.data) {
      fetched = { buffer: Buffer.from(resp.data), contentType: String(resp.headers['content-type'] || 'text/csv') };
    }
  } catch (err) {
    console.error('Failed to fetch demo dataset from ML engine:', (err as any)?.message);
  }

  if (!fetched) {
    return res.status(500).json({ success: false, error: 'Demo dataset is not available from ML engine.' });
  }

  const results: any[] = [];
  try {
    await new Promise<void>((resolve, reject) => {
      const r = new stream.PassThrough();
      r.end(fetched!.buffer);
      r.pipe(csv()).on('data', (d) => { if (results.length < 500) results.push(d); }).on('end', resolve).on('error', reject);
    });
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to read demo dataset.' });
  }

  const analytics = computeAnalyticsStatic(results);
  const datasetId = `ds_demo_${Date.now()}`;
  const demoPath = path.join(uploadDir, `${datasetId}_manufacturing_data.csv`);
  fs.writeFileSync(demoPath, fetched.buffer);

  saveDataset(datasetId, {
    id: datasetId,
    userId,
    filename: 'manufacturing_data.csv',
    originalName: 'manufacturing_data.csv',
    filePath: demoPath,
    analytics,
  });

  res.json({ success: true, datasetId, filename: datasetId, preview: results, analytics });
});

// ─── Optimization Jobs ────────────────────────────────────────────────────────
router.post('/optimization/jobs', requireAuth, rateLimit, async (req, res) => {
  try {
    const { filename, template_id, intent, monthly_volume, unit_value, projectId } = req.body;
    if (!filename) return res.status(400).json({ success: false, error: 'filename is required' });

    const resolved = await resolveOptimizationFile(filename);
    if (!resolved) {
      return res.status(400).json({
        success: false,
        error: `Dataset file not found on server: ${filename}. Upload a fresh dataset or load the demo.`,
      });
    }

    const fileContent = fs.readFileSync(resolved.localPath).toString('base64');
    const jobId = randomBytes(12).toString('hex');
    const userId = (req as any).user?.userId || (req as any).user?.id || 'anonymous';

    // ── Execution Guard: Require confirmed GoalReview ──────────────────
    let confirmedSetup: any = null;
    if (projectId) {
      const confirmedReview = await prisma.goalReview.findFirst({
        where: { projectId, status: 'CONFIRMED' },
        orderBy: { updatedAt: 'desc' },
      });
      if (confirmedReview && confirmedReview.confirmedJson) {
        try {
          confirmedSetup = JSON.parse(confirmedReview.confirmedJson);
        } catch {
          // Ignore
        }
      }
    }

    // If intent is passed explicitly with confirmed flag or confirmed setup found
    if (!confirmedSetup && req.body.confirmedSetup) {
      confirmedSetup = req.body.confirmedSetup;
    }

    if (!confirmedSetup) {
      return res.status(400).json({
        success: false,
        error: 'Confirmed goal review is required before optimization. Please complete the Review & Confirm step on the Goal page.',
      });
    }

    const payload = {
      job_id: jobId,
      filename: resolved.dataset?.filename || filename,
      file_content: fileContent,
      template_id: template_id || 'yield_optimizer',
      target: confirmedSetup.target || intent?.target,
      features: confirmedSetup.features?.length ? confirmedSetup.features : (intent?.features?.length ? intent.features : undefined),
      goal_direction: confirmedSetup.direction || intent?.goal_direction || 'maximize',
      threshold: confirmedSetup.threshold ?? intent?.threshold,
      constraints: confirmedSetup.constraints || intent?.constraints,
      monthly_volume: monthly_volume || undefined,
      unit_value: unit_value || undefined,
    };

    await createOptimizationJobDb({
      id: jobId, userId,
      datasetId: resolved.dataset?.id,
      status: 'queued', stage: 'Queued', progress: 0,
      requestJson: JSON.stringify(payload),
      createdAt: Date.now(), updatedAt: Date.now(),
    });

    await logAuditEvent({
      userId,
      projectId: projectId || undefined,
      action: 'OPTIMIZATION_STARTED_FROM_CONFIRMED_GOAL',
      entityType: 'OPTIMIZATION_JOB',
      entityId: jobId,
      metadata: { target: payload.target, featuresCount: payload.features?.length },
    });

    if (projectId && typeof projectId === 'string' && /^[0-9a-fA-F]{24}$/.test(projectId)) {
      await updateProject(projectId, { optimizationJobId: jobId, status: 'optimizing' });
    }

    const jobTimeout = parseInt(process.env.JOB_TIMEOUT_MS || '180000', 10);

    (async () => {
      try {
        const response = await axios.post(`${ML_ENGINE_URL}/optimize-yield`, payload, {
          timeout: jobTimeout, headers: mlHeaders(),
        });
        const result = response.data;
        if (result?.success) {
          await saveOptimization(jobId, {
            id: jobId,
            userId,
            ...(resolved.dataset?.id ? { datasetId: resolved.dataset.id } : {}),
            filename: payload.filename,
            template_id: payload.template_id,
            result,
          });
          await updateOptimizationJobDb(jobId, { status: 'completed', stage: 'Completed', resultJson: JSON.stringify(result), progress: 100 });
          if (projectId) await updateProject(projectId, { status: 'completed' });
        } else {
          await updateOptimizationJobDb(jobId, { status: 'failed', stage: 'Error', error: result?.error || 'Optimization failed' });
          if (projectId) await updateProject(projectId, { status: 'error' });
        }
      } catch (error: any) {
        const errMsg = error.response?.data?.error || error.message || 'Optimization failed';
        await updateOptimizationJobDb(jobId, { status: 'failed', stage: 'Error', error: errMsg });
        if (projectId) await updateProject(projectId, { status: 'error' });
      }
    })();

    res.json({ success: true, jobId, status: 'queued' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to start optimization' });
  }
});

router.get('/optimization/jobs/:id', requireAuth, async (req, res) => {
  try {
    const record = await getOptimizationJobDb(req.params.id as string);
    if (!record) return res.status(404).json({ success: false, error: 'Optimization job not found' });

    let { status, stage, progress } = record as any;
    let result = record.resultJson ? JSON.parse(record.resultJson as string) : undefined;
    const error = (record as any).error;

    if (status !== 'completed' && status !== 'failed') {
      try {
        const mlStatus = await axios.get(`${ML_ENGINE_URL}/optimize-yield/jobs/${record.id}`, {
          timeout: 3000, headers: mlHeaders(),
        });
        if (mlStatus.data?.success) {
          status = mlStatus.data.status || status;
          stage = mlStatus.data.stage || stage;
          progress = mlStatus.data.progress ?? progress;
          if (mlStatus.data.status === 'completed' && mlStatus.data.result) result = mlStatus.data.result;
        }
      } catch {}
    }

    res.json({ success: true, jobId: record.id, status, stage, progress, result, error });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to get job status' });
  }
});

function parseGoalFallback(goalText: string, templateId?: string, columns: string[] = []) {
  const text = (goalText || '').toLowerCase();
  
  const candidateCols = columns.filter(
    (c) => !/exp|experiment|id|no\.|sl_no|index|sample_id/i.test(c)
  );
  
  const colsToUse = candidateCols.length > 0 ? candidateCols : columns;

  const isMinimize = /min|lower|reduce|less|decrease|defect|roughness|stringing|scrap|downtime|burr|impurity/i.test(text);
  const goalDirection = isMinimize ? 'minimize' : 'maximize';

  let target = colsToUse.find((c) => text.includes(c.toLowerCase()));
  if (!target) {
    target = colsToUse.find((c) => /yield|quality|roughness|cylindricity|thickness|stringing|moisture|hardness|density/i.test(c)) || colsToUse[colsToUse.length - 1] || 'Yield';
  }

  const features = colsToUse.filter((c) => c !== target);
  if (features.length === 0 && columns.length > 0) {
    features.push(...columns.filter((c) => c !== target));
  }

  const constraints: Record<string, { min?: number; max?: number }> = {};
  features.forEach((f) => {
    constraints[f] = { min: 10, max: 250 };
  });

  return {
    success: true,
    raw_text: goalText,
    template_id: templateId || 'yield_optimizer',
    target,
    goal_direction: goalDirection,
    threshold: isMinimize ? 0.5 : 92.0,
    features,
    constraints,
  };
}

const parseGoalHandler = async (req: any, res: any) => {
  const { goal_text, template_id, columns } = req.body || {};
  try {
    const response = await axios.post(`${ML_ENGINE_URL}/parse-goal`, req.body, {
      timeout: 10000,
      headers: mlHeaders(),
    });
    if (response.status === 200 && response.data) {
      return res.json(response.data);
    }
  } catch (error: any) {
    console.warn('[goal-parser] ML Engine parse-goal failed or offline. Using fallback parser:', error.message);
  }

  const fallback = parseGoalFallback(goal_text, template_id, columns);
  return res.json(fallback);
};

router.post('/parse-goal', requireAuth, rateLimit, parseGoalHandler);
router.post('/goal/parse', requireAuth, rateLimit, parseGoalHandler);
router.post('/projects/:projectId/goal/parse', requireAuth, rateLimit, parseGoalHandler);
router.post('/projects/:projectId/parse-goal', requireAuth, rateLimit, parseGoalHandler);

// ─── QC Routes ────────────────────────────────────────────────────────────────
async function proxyQc(subpath: string, req: any, res: any) {
  try {
    const response = await axios.post(`${ML_ENGINE_URL}/qc/${subpath}`, req.body, {
      headers: mlHeaders(), timeout: 20000,
    });
    return res.status(response.status).json(response.data);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.response?.data?.error || err.message || 'QC computation failed',
    });
  }
}

router.post('/qc/summary',             requireAuth, rateLimit, (req, res) => proxyQc('summary', req, res));
router.post('/qc/control-chart',       requireAuth, rateLimit, (req, res) => proxyQc('control-chart', req, res));
router.post('/qc/capability',          requireAuth, rateLimit, (req, res) => proxyQc('capability', req, res));
router.post('/qc/acceptance-sampling', requireAuth, rateLimit, (req, res) => proxyQc('acceptance-sampling', req, res));

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id || (req as any).user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const metrics = await getDashboardMetrics(userId);
    res.json({ success: true, ...metrics });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to load dashboard' });
  }
});

export default router;
