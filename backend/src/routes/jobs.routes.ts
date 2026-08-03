import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { trainingQueue } from '../services/jobQueue';
import { z } from 'zod';
import { getOptimizationJobDb, createOptimizationJobDb } from '../db/optimizationJobs';
import { getDataset } from '../data/datasetStore';

const router = Router();

const CreateJobSchema = z.object({
  datasetId: z.string(),
  goal: z.string().min(3),
  parsedIntent: z.object({
    task_type: z.string(),
    target_column: z.string(),
    features: z.array(z.string()),
    objective: z.string(),
    threshold: z.number().nullable().optional(),
    constraints: z.record(z.any()).optional(),
  }),
  isDemoMode: z.boolean().default(false),
});

// POST /api/jobs — create + enqueue training job
router.post('/', async (req: Request, res: Response) => {
  const body = CreateJobSchema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ success: false, error: body.error });

  const { datasetId, goal, parsedIntent, isDemoMode } = body.data;

  const dataset = await getDataset(datasetId);
  const storagePath = dataset?.filePath || dataset?.storageKey || 'c:/Users/sathish/Desktop/Modliq/Modliq/ml-engine/data/manufacturing_data.csv';
  const userId = (req.headers['x-user-id'] as string) || 'demo-user-static-backend';

  const jobId = crypto.randomBytes(12).toString('hex');

  await createOptimizationJobDb({
    id: jobId,
    userId,
    datasetId,
    status: 'queued',
    stage: 'Queued',
    progress: 0,
    requestJson: JSON.stringify(parsedIntent),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  try {
    await trainingQueue.add('train', {
      jobId,
      datasetPath: storagePath,
      targetColumn: parsedIntent.target_column,
      features: parsedIntent.features,
      taskType: parsedIntent.task_type,
      objective: parsedIntent.objective,
      threshold: parsedIntent.threshold || null,
      constraints: parsedIntent.constraints || {},
      monthlyVolume: 100000,
      unitValue: 75,
      isDemoMode,
    });
  } catch (queueErr) {
    console.warn('[JobsRoute] Queue add warning:', queueErr);
  }

  res.json({ success: true, jobId });
});

// GET /api/jobs/:jobId — poll status
router.get('/:jobId', async (req: Request, res: Response) => {
  const jobId = Array.isArray(req.params.jobId) ? req.params.jobId[0] : req.params.jobId;
  const job = await getOptimizationJobDb(jobId);
  if (!job) return res.status(404).json({ success: false, error: { message: 'Job not found' } });
  res.json({ success: true, job });
});

// GET /api/jobs/:jobId/stream — SSE progress stream
router.get('/:jobId/stream', async (req: Request, res: Response) => {
  const jobId = Array.isArray(req.params.jobId) ? req.params.jobId[0] : req.params.jobId;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data: object) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  const interval = setInterval(async () => {
    const job = await getOptimizationJobDb(jobId);
    if (!job) {
      clearInterval(interval);
      res.end();
      return;
    }

    send({ status: job.status, progress: job.progress, step: job.stage });

    if (job.status === 'complete' || job.status === 'completed' || job.status === 'failed') {
      clearInterval(interval);
      res.end();
    }
  }, 1000);

  req.on('close', () => clearInterval(interval));
});

export default router;
export { router as jobsRouter };
