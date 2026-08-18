"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pino_1 = __importDefault(require("pino"));
const crypto_1 = require("crypto");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const projects_routes_1 = __importDefault(require("./routes/projects.routes"));
const dataset_routes_1 = require("./routes/dataset.routes");
const jobs_routes_1 = require("./routes/jobs.routes");
const models_routes_1 = require("./routes/models.routes");
const predict_routes_1 = require("./routes/predict.routes");
const enterprise_routes_1 = require("./routes/enterprise.routes");
const organization_routes_1 = __importDefault(require("./routes/organization.routes"));
const entitlements_routes_1 = __importDefault(require("./routes/entitlements.routes"));
const onboarding_routes_1 = __importDefault(require("./routes/onboarding.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const support_routes_1 = __importDefault(require("./routes/support.routes"));
const shareLink_routes_1 = __importDefault(require("./routes/shareLink.routes"));
const template_routes_1 = __importDefault(require("./routes/template.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const websiteAdmin_routes_1 = __importDefault(require("./routes/websiteAdmin.routes"));
const publicWebsite_routes_1 = __importDefault(require("./routes/publicWebsite.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const projects_1 = require("./db/projects");
const datasetStore_1 = require("./data/datasetStore");
const optimizationStore_1 = require("./data/optimizationStore");
const workspaceStore_1 = require("./data/workspaceStore");
const dashboardData_1 = require("./data/dashboardData");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const stream_1 = __importDefault(require("stream"));
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("./middleware/auth");
const validation_1 = require("./middleware/validation");
const optimizationJobs_1 = require("./db/optimizationJobs");
const logger = (0, pino_1.default)({ level: process.env.LOG_LEVEL || 'info' });
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://127.0.0.1:8000';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://modliq.vercel.app';
const ML_INTERNAL_API_KEY = process.env.ML_INTERNAL_API_KEY || '';
// In production, CORS is scoped strictly to the real frontend origin.
// localhost is only allowed in non-production for local dev.
const corsOrigins = process.env.NODE_ENV === 'production'
    ? [CLIENT_ORIGIN]
    : [CLIENT_ORIGIN, 'http://localhost:3000', 'http://localhost:5173'];
app.use((0, cors_1.default)({ origin: corsOrigins }));
// Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});
const sanitization_1 = require("./security/sanitization");
app.use(sanitization_1.noSqlInjectionProtection);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.set('trust proxy', true);
const idempotency_1 = require("./middleware/idempotency");
app.use(idempotency_1.idempotencyMiddleware);
function mlEngineHeaders() {
    const headers = {};
    if (ML_INTERNAL_API_KEY) {
        headers['X-Modliq-Service-Key'] = ML_INTERNAL_API_KEY;
    }
    return headers;
}
console.log(`[backend] ML_ENGINE_URL=${ML_ENGINE_URL}`);
console.log(`[backend] CLIENT_ORIGIN=${CLIENT_ORIGIN}`);
// ==================================================
// RATE LIMITING (simple in-memory sliding window)
// ==================================================
const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '120', 10);
const rateLimitHits = new Map();
function rateLimit(req, res, next) {
    const key = req.user?.userId || req.ip || 'anonymous';
    const now = Date.now();
    const hits = rateLimitHits.get(key) || [];
    const recent = hits.filter(t => now - t < rateLimitWindow);
    recent.push(now);
    rateLimitHits.set(key, recent);
    if (recent.length > rateLimitMax) {
        return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }
    next();
}
const goalCrosscheck_routes_1 = __importDefault(require("./routes/goalCrosscheck.routes"));
const aiLabs_routes_1 = require("./routes/aiLabs.routes");
const aiStack_routes_1 = __importDefault(require("./routes/aiStack.routes"));
const dataLabeling_routes_1 = __importDefault(require("./routes/dataLabeling.routes"));
const fineTuning_routes_1 = __importDefault(require("./routes/fineTuning.routes"));
const credentialVault_routes_1 = __importDefault(require("./routes/credentialVault.routes"));
const vectorSearch_routes_1 = __importDefault(require("./routes/vectorSearch.routes"));
const evaluationStudio_routes_1 = __importDefault(require("./routes/evaluationStudio.routes"));
const inferenceMonitor_routes_1 = __importDefault(require("./routes/inferenceMonitor.routes"));
const agentRunManager_routes_1 = __importDefault(require("./routes/agentRunManager.routes"));
// ==================================================
// AUTH, AUTOML & ENTERPRISE ROUTES
// ==================================================
app.use('/api/auth', auth_routes_1.default);
app.use('/api/datasets', auth_middleware_1.authMiddleware, dataset_routes_1.datasetRouter);
app.use('/api/jobs', auth_middleware_1.authMiddleware, jobs_routes_1.jobsRouter);
app.use('/api/models', auth_middleware_1.authMiddleware, models_routes_1.modelsRouter);
app.use('/api/predict', auth_middleware_1.authMiddleware, predict_routes_1.predictRouter);
app.use('/api/v1/enterprise', enterprise_routes_1.enterpriseRouter);
app.use('/api/v1/projects/:projectId/goal', goalCrosscheck_routes_1.default);
app.use('/api/v1/projects/:projectId/templates', goalCrosscheck_routes_1.default);
app.use('/api/v1/ai-labs', aiLabs_routes_1.aiLabsRouter);
// AI & ML Tech Stack & Modular Infrastructure Routes
app.use('/api/v1', aiStack_routes_1.default);
app.use('/api/v1', dataLabeling_routes_1.default);
app.use('/api/v1', fineTuning_routes_1.default);
app.use('/api/v1', credentialVault_routes_1.default);
app.use('/api/v1', vectorSearch_routes_1.default);
app.use('/api/v1', evaluationStudio_routes_1.default);
app.use('/api/v1', inferenceMonitor_routes_1.default);
app.use('/api/v1', agentRunManager_routes_1.default);
// ==================================================
// STORAGE + HELPERS
// ==================================================
const isProduction = process.env.NODE_ENV === 'production';
const STORE_DIR = isProduction ? '/tmp/modliq' : path_1.default.join(process.cwd(), 'uploads');
const uploadDir = isProduction
    ? path_1.default.join(STORE_DIR, 'uploads')
    : path_1.default.join(__dirname, '../uploads');
function ensureDir() {
    try {
        if (!fs_1.default.existsSync(STORE_DIR)) {
            fs_1.default.mkdirSync(STORE_DIR, { recursive: true });
        }
    }
    catch (err) {
        console.error('Failed to create store directory:', err);
    }
}
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
async function fetchDemoDatasetFromMlEngine() {
    try {
        const response = await axios_1.default.get(`${ML_ENGINE_URL}/demo-dataset`, {
            timeout: 15000,
            headers: mlEngineHeaders(),
            responseType: 'arraybuffer',
        });
        if (response.status === 200 && response.data) {
            return { buffer: Buffer.from(response.data), contentType: String(response.headers['content-type'] || 'text/csv') };
        }
    }
    catch (err) {
        console.error('Failed to fetch demo dataset from ML engine:', err?.message || err);
    }
    return null;
}
function computeAnalyticsStatic(rows) {
    const totalRows = rows.length;
    if (totalRows === 0) {
        return { totalRows: 0, totalColumns: 0, missingValues: 0, numericColumns: [], categoricalColumns: [] };
    }
    const headers = Object.keys(rows[0]);
    const columnTypes = {};
    let missingValues = 0;
    for (const col of headers) {
        let isNumeric = false;
        for (const row of rows) {
            const v = row[col];
            if (v === null || v === undefined || v === '') {
                missingValues++;
                continue;
            }
            if (!isNaN(Number(v))) {
                isNumeric = true;
                break;
            }
        }
        columnTypes[col] = isNumeric ? 'numeric' : 'categorical';
    }
    const numericColumns = Object.keys(columnTypes).filter((c) => columnTypes[c] === 'numeric');
    const categoricalColumns = Object.keys(columnTypes).filter((c) => columnTypes[c] === 'categorical');
    return {
        totalRows,
        totalColumns: headers.length,
        missingValues,
        numericColumns,
        categoricalColumns,
    };
}
function findFileInUploads(filename) {
    const directPath = path_1.default.join(uploadDir, filename);
    if (fs_1.default.existsSync(directPath) && fs_1.default.statSync(directPath).isFile()) {
        return directPath;
    }
    try {
        const entries = fs_1.default.readdirSync(uploadDir, { recursive: true });
        for (const entry of entries) {
            if (typeof entry !== 'string')
                continue;
            const fullPath = path_1.default.join(uploadDir, entry);
            if (path_1.default.basename(fullPath) === filename && fs_1.default.statSync(fullPath).isFile()) {
                return fullPath;
            }
        }
    }
    catch (err) {
        console.error('Failed to scan uploads directory:', err);
    }
    return null;
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.userId || 'default_user';
        const userDir = path_1.default.join(uploadDir, userId);
        if (!fs_1.default.existsSync(userDir))
            fs_1.default.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: MAX_UPLOAD_BYTES },
    fileFilter: (req, file, cb) => {
        const isCsv = file.mimetype === 'text/csv' ||
            file.mimetype === 'application/vnd.ms-excel' ||
            file.originalname.toLowerCase().endsWith('.csv');
        if (!isCsv) {
            return cb(new Error('Only CSV files are allowed'));
        }
        cb(null, true);
    },
});
// ==================================================
// API V1 ROUTES
// ==================================================
const apiV1 = express_1.default.Router();
apiV1.use('/projects', projects_routes_1.default);
apiV1.use('/user', projects_routes_1.default);
apiV1.use('/organizations', organization_routes_1.default);
apiV1.use('/entitlements', entitlements_routes_1.default);
apiV1.use('/onboarding', onboarding_routes_1.default);
apiV1.use('/notifications', notification_routes_1.default);
apiV1.use('/support', support_routes_1.default);
apiV1.use('/templates', template_routes_1.default);
apiV1.use('/account', account_routes_1.default);
apiV1.use('/admin/website', websiteAdmin_routes_1.default);
apiV1.use('/admin', admin_routes_1.default);
app.use('/api/v1/public', publicWebsite_routes_1.default);
apiV1.use('/', shareLink_routes_1.default);
// --------------------------------------------------
// Workspace
// --------------------------------------------------
apiV1.post('/workspace/:userId/dataset', auth_1.requireAuth, (req, res) => {
    const { datasetId } = req.body;
    if (!datasetId)
        return res.status(400).json({ error: 'datasetId required' });
    (0, workspaceStore_1.setActiveDataset)(req.params.userId, datasetId);
    res.json({ success: true, activeDatasetId: datasetId });
});
apiV1.get('/workspace/:userId', auth_1.requireAuth, (req, res) => {
    const workspace = (0, workspaceStore_1.getWorkspace)(req.params.userId);
    res.json({ success: true, workspace });
});
// --------------------------------------------------
// Datasets
// --------------------------------------------------
apiV1.get('/datasets/:id/preview', auth_1.requireAuth, async (req, res) => {
    const dataset = await (0, datasetStore_1.getDataset)(req.params.id);
    if (!dataset)
        return res.status(404).json({ error: 'Dataset not found' });
    if (!dataset.filePath)
        return res.status(404).json({ error: 'Dataset file not found' });
    const rows = parseInt(req.query.rows, 10) || 50;
    const results = [];
    let rowCount = 0;
    fs_1.default.createReadStream(dataset.filePath ?? '')
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => {
        if (rowCount < rows)
            results.push(data);
        rowCount++;
    })
        .on('end', () => res.json({ success: true, preview: results, filename: dataset.filename, analytics: dataset.analytics }))
        .on('error', () => res.status(500).json({ error: 'Failed to read preview' }));
});
apiV1.post('/datasets/:id/health', auth_1.requireAuth, async (req, res) => {
    const dataset = await (0, datasetStore_1.getDataset)(req.params.id);
    if (!dataset)
        return res.status(404).json({ error: 'Dataset not found' });
    const rows = [];
    try {
        await new Promise((resolve, reject) => {
            fs_1.default.createReadStream(dataset.filePath ?? '')
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => rows.push(data))
                .on('end', resolve)
                .on('error', reject);
        });
        const mlPayload = {
            rows,
            targetColumn: req.body.targetColumn || null,
            features: req.body.features || null,
            mode: req.body.mode || 'generic',
        };
        const response = await axios_1.default.post(`${ML_ENGINE_URL}/dataset-health`, mlPayload, {
            headers: mlEngineHeaders(),
        });
        res.json(response.data);
    }
    catch (err) {
        console.error('Health check error:', err.message, err.response?.data);
        res.status(500).json({ success: false, error: 'Failed to compute dataset health', details: err.message, responseData: err.response?.data });
    }
});
apiV1.post('/datasets/demo/:userId', auth_1.requireAuth, async (req, res) => {
    const userId = req.params.userId;
    const fetched = await fetchDemoDatasetFromMlEngine();
    if (!fetched) {
        return res.status(500).json({ success: false, error: 'Demo dataset is not available on the server.' });
    }
    const results = [];
    try {
        await new Promise((resolve, reject) => {
            const readStream = new stream_1.default.PassThrough();
            readStream.end(fetched.buffer);
            readStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => {
                if (results.length < 500)
                    results.push(data);
            })
                .on('end', () => resolve())
                .on('error', reject);
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'Failed to read demo dataset.' });
    }
    const analytics = computeAnalyticsStatic(results);
    const datasetId = `ds_demo_${Date.now()}`;
    const demoLocalPath = path_1.default.join(uploadDir, `${datasetId}_manufacturing_data.csv`);
    fs_1.default.writeFileSync(demoLocalPath, fetched.buffer);
    (0, datasetStore_1.saveDataset)(datasetId, {
        id: datasetId,
        userId,
        filename: 'manufacturing_data.csv',
        originalName: 'manufacturing_data.csv',
        filePath: demoLocalPath,
        analytics,
    });
    (0, workspaceStore_1.setActiveDataset)(userId, datasetId);
    res.json({
        success: true,
        datasetId,
        filename: datasetId,
        preview: results,
        analytics,
    });
});
apiV1.post('/datasets/upload/:userId', auth_1.requireAuth, upload.single('dataset'), validation_1.validateDatasetUpload, async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        const fileSize = fs_1.default.statSync(req.file.path).size;
        if (fileSize > MAX_UPLOAD_BYTES) {
            return res.status(413).json({ success: false, error: 'File exceeds maximum allowed size' });
        }
        const results = [];
        let missingValues = 0;
        let totalRows = 0;
        let headers = [];
        let hasError = false;
        let columnTypes = {};
        let isFirstRow = true;
        fs_1.default.createReadStream(req.file.path)
            .pipe((0, csv_parser_1.default)())
            .on('headers', (headerList) => {
            headers = headerList;
            if (new Set(headers).size !== headers.length) {
                hasError = true;
                return res.status(400).json({ success: false, error: 'Duplicate column headers detected.' });
            }
            if (headers.length === 0) {
                hasError = true;
                return res.status(400).json({ success: false, error: 'CSV must contain at least one column.' });
            }
            for (const header of headers) {
                if (!/^[a-zA-Z0-9_\- ]+$/.test(header)) {
                    hasError = true;
                    return res.status(400).json({ success: false, error: `Invalid column header: ${header}` });
                }
            }
        })
            .on('data', (data) => {
            if (hasError)
                return;
            if (totalRows < 5)
                results.push(data);
            totalRows++;
            if (totalRows > 100000) {
                hasError = true;
                return res.status(413).json({ success: false, error: 'Dataset exceeds 100k rows limit.' });
            }
            if (isFirstRow) {
                Object.entries(data).forEach(([key, value]) => {
                    columnTypes[key] = (!isNaN(Number(value)) && value !== '') ? 'numeric' : 'categorical';
                });
                isFirstRow = false;
            }
            else {
                Object.entries(data).forEach(([key, value]) => {
                    if (columnTypes[key] === 'numeric' && value !== '' && isNaN(Number(value))) {
                        columnTypes[key] = 'categorical';
                    }
                });
            }
            Object.values(data).forEach((value) => {
                if (value === null || value === undefined || value === '')
                    missingValues++;
            });
        })
            .on('end', () => {
            if (hasError)
                return;
            if (totalRows === 0) {
                return res.status(400).json({ success: false, error: 'Empty CSV or CSV with only headers.' });
            }
            const totalColumns = headers.length;
            const numericColumns = Object.keys(columnTypes).filter(k => columnTypes[k] === 'numeric');
            const categoricalColumns = Object.keys(columnTypes).filter(k => columnTypes[k] === 'categorical');
            const datasetId = req.file.filename;
            const analytics = {
                totalRows,
                totalColumns,
                missingValues,
                numericColumns,
                categoricalColumns,
            };
            (0, datasetStore_1.saveDataset)(datasetId, {
                id: datasetId,
                userId: req.params.userId,
                filename: req.file.originalname,
                originalName: req.file.originalname,
                filePath: req.file.path,
                analytics,
            });
            (0, workspaceStore_1.setActiveDataset)(req.params.userId, datasetId);
            res.json({
                success: true,
                datasetId,
                filename: datasetId,
                preview: results.slice(0, 500),
                analytics,
            });
        })
            .on('error', () => {
            if (!hasError)
                res.status(500).json({ success: false, error: 'CSV parsing failed' });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
});
// --------------------------------------------------
// Optimization
// --------------------------------------------------
async function resolveOptimizationFile(filename) {
    let localPath = path_1.default.join(uploadDir, filename);
    const dataset = await (0, datasetStore_1.getDataset)(filename);
    if (dataset && dataset.filePath) {
        localPath = dataset.filePath;
    }
    const resolvedPath = fs_1.default.existsSync(localPath) && fs_1.default.statSync(localPath).isFile()
        ? localPath
        : findFileInUploads(filename);
    if (!resolvedPath)
        return null;
    const realUploadDir = fs_1.default.realpathSync(uploadDir);
    const realResolved = fs_1.default.realpathSync(resolvedPath);
    if (!realResolved.startsWith(realUploadDir)) {
        return null;
    }
    return { localPath: resolvedPath, dataset };
}
async function createOptimizationJobRecord(job) {
    await (0, optimizationJobs_1.createOptimizationJobDb)({
        id: job.id,
        userId: job.userId,
        datasetId: job.datasetId,
        status: job.status,
        stage: job.stage,
        progress: job.progress || 0,
        requestJson: job.requestJson,
        resultJson: job.resultJson,
        error: job.error,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
    });
}
async function updateOptimizationJobRecord(id, data) {
    await (0, optimizationJobs_1.updateOptimizationJobDb)(id, data);
}
async function loadOptimizationJobsFromDb() {
    // Optimization jobs are now loaded on demand from Postgres via getOptimizationJobDb.
    // No bulk load needed at startup.
}
// Initialize durable job store on startup
(0, optimizationJobs_1.initDb)().catch((err) => {
    console.error('Failed to initialize optimization job database:', err);
});
apiV1.post('/optimization/jobs', auth_1.requireAuth, rateLimit, async (req, res) => {
    try {
        const { filename, template_id, intent, monthly_volume, unit_value, projectId } = req.body;
        if (!filename) {
            return res.status(400).json({ success: false, error: 'filename is required' });
        }
        const resolved = await resolveOptimizationFile(filename);
        if (!resolved) {
            return res.status(400).json({
                success: false,
                error: `Dataset file not found on server: ${filename}. Upload a fresh dataset or load the demo.`,
            });
        }
        const fileContent = fs_1.default.readFileSync(resolved.localPath).toString('base64');
        const jobId = (0, crypto_1.randomBytes)(12).toString('hex');
        const userId = req.user?.userId || req.user?.id || 'anonymous';
        const payload = {
            job_id: jobId,
            filename: resolved.dataset ? resolved.dataset.filename : filename,
            file_content: fileContent,
            template_id: template_id || 'yield_optimizer',
            target: intent?.target,
            features: intent?.features?.length ? intent.features : undefined,
            goal_direction: intent?.goal_direction || 'maximize',
            threshold: intent?.threshold,
            constraints: intent?.constraints,
            monthly_volume: monthly_volume || undefined,
            unit_value: unit_value || undefined,
        };
        const jobRecord = {
            id: jobId,
            userId,
            datasetId: resolved.dataset?.id,
            status: 'queued',
            stage: 'Queued',
            progress: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            requestJson: JSON.stringify(payload),
        };
        await createOptimizationJobRecord(jobRecord);
        if (projectId && typeof projectId === 'string' && /^[0-9a-fA-F]{24}$/.test(projectId)) {
            await (0, projects_1.updateProject)(projectId, {
                optimizationJobId: jobId,
                status: 'optimizing',
            });
        }
        const jobTimeout = parseInt(process.env.JOB_TIMEOUT_MS || '180000', 10);
        (async () => {
            try {
                const response = await axios_1.default.post(`${ML_ENGINE_URL}/optimize-yield`, payload, {
                    timeout: jobTimeout,
                    headers: mlEngineHeaders(),
                });
                const result = response.data;
                if (result && result.success) {
                    await (0, optimizationStore_1.saveOptimization)(jobId, {
                        id: jobId,
                        userId,
                        datasetId: resolved.dataset?.id || null,
                        filename: payload.filename,
                        template_id: payload.template_id,
                        result,
                    });
                    await updateOptimizationJobRecord(jobId, {
                        status: 'completed',
                        stage: 'Completed',
                        resultJson: JSON.stringify(result),
                        progress: 100,
                    });
                    if (projectId) {
                        await (0, projects_1.updateProject)(projectId, { status: 'completed' });
                    }
                }
                else {
                    await updateOptimizationJobRecord(jobId, {
                        status: 'failed',
                        stage: 'Error',
                        error: result?.error || 'Optimization failed',
                    });
                    if (projectId) {
                        await (0, projects_1.updateProject)(projectId, { status: 'error' });
                    }
                }
            }
            catch (error) {
                const errMsg = error.response?.data?.error || error.message || 'Optimization failed';
                await updateOptimizationJobRecord(jobId, {
                    status: 'failed',
                    stage: 'Error',
                    error: errMsg,
                });
                if (projectId) {
                    await (0, projects_1.updateProject)(projectId, { status: 'error' });
                }
            }
        })();
        res.json({ success: true, jobId, status: 'queued' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message || 'Failed to start optimization' });
    }
});
apiV1.get('/optimization/jobs/:id', auth_1.requireAuth, async (req, res) => {
    try {
        const record = await (0, optimizationJobs_1.getOptimizationJobDb)(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, error: 'Optimization job not found' });
        }
        let currentStatus = record.status;
        let currentStage = record.stage;
        let currentProgress = record.progress;
        let result = record.resultJson ? JSON.parse(record.resultJson) : undefined;
        let error = record.error;
        // Check real-time queue status from ML Engine if job is not completed or failed
        if (record.status !== 'completed' && record.status !== 'failed') {
            try {
                const mlStatusRes = await axios_1.default.get(`${ML_ENGINE_URL}/optimize-yield/jobs/${record.id}`, {
                    timeout: 3000,
                    headers: mlEngineHeaders(),
                });
                if (mlStatusRes.data && mlStatusRes.data.success) {
                    currentStatus = mlStatusRes.data.status || currentStatus;
                    currentStage = mlStatusRes.data.stage || currentStage;
                    currentProgress = mlStatusRes.data.progress ?? currentProgress;
                    if (mlStatusRes.data.result)
                        result = mlStatusRes.data.result;
                    if (mlStatusRes.data.error)
                        error = mlStatusRes.data.error;
                }
            }
            catch (e) {
                // Silently fall back to stored DB status if ML Engine status endpoint is unreachable
            }
        }
        res.json({
            success: true,
            id: record.id,
            status: currentStatus,
            result,
            error,
            progress: currentProgress,
            stage: currentStage,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message || 'Failed to load job' });
    }
});
apiV1.get('/warmup', async (req, res) => {
    try {
        const r = await axios_1.default.get(`${ML_ENGINE_URL}/warmup`, { timeout: 5000 });
        res.json({ success: true, mlEngineStatus: r.status });
    }
    catch (error) {
        res.json({ success: false, error: error.message });
    }
});
apiV1.get('/optimization/:id/results', auth_1.requireAuth, async (req, res) => {
    const record = await (0, optimizationStore_1.getOptimization)(req.params.id);
    if (!record)
        return res.status(404).json({ success: false, error: 'Optimization not found' });
    const parsed = record.result ? JSON.parse(record.result) : null;
    res.json({ success: true, ...record, result: parsed });
});
apiV1.get('/optimization/:id/report', auth_1.requireAuth, async (req, res) => {
    const record = await (0, optimizationStore_1.getOptimization)(req.params.id);
    if (!record)
        return res.status(404).json({ success: false, error: 'Optimization not found' });
    const parsed = record.result ? JSON.parse(record.result) : null;
    res.json({ success: true, id: record.id, generated_at: new Date().toISOString(), report: parsed });
});
// --------------------------------------------------
// AI Goal Parsing (proxied to ML Engine)
// --------------------------------------------------
apiV1.post('/parse-goal', auth_1.requireAuth, rateLimit, validation_1.validateGoalRequest, async (req, res) => {
    try {
        const response = await axios_1.default.post(`${ML_ENGINE_URL}/parse-goal`, req.body, {
            headers: mlEngineHeaders(),
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.response?.data?.detail || error.message || 'Goal parsing failed',
        });
    }
});
// --------------------------------------------------
// QC — single deterministic engine, proxied to ML engine
// --------------------------------------------------
async function proxyQc(subpath, req, res) {
    try {
        const response = await axios_1.default.post(`${ML_ENGINE_URL}/qc/${subpath}`, req.body, {
            headers: mlEngineHeaders(),
            timeout: 20000,
        });
        return res.status(response.status).json(response.data);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err.response?.data?.error || err.message || 'QC computation failed',
        });
    }
}
apiV1.post('/qc/summary', auth_1.requireAuth, rateLimit, (req, res) => proxyQc('summary', req, res));
apiV1.post('/qc/control-chart', auth_1.requireAuth, rateLimit, (req, res) => proxyQc('control-chart', req, res));
apiV1.post('/qc/capability', auth_1.requireAuth, rateLimit, (req, res) => proxyQc('capability', req, res));
apiV1.post('/qc/acceptance-sampling', auth_1.requireAuth, rateLimit, (req, res) => proxyQc('acceptance-sampling', req, res));
// --------------------------------------------------
// Dashboard (recent activity derived from persisted runs)
// --------------------------------------------------
apiV1.get('/dashboard', auth_1.requireAuth, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const metrics = await (0, dashboardData_1.getDashboardMetrics)(userId);
        res.json({ success: true, ...metrics });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message || 'Failed to load dashboard' });
    }
});
// Legacy alias: frontend dashboard.service calls /dashboard directly.
app.get('/dashboard', auth_1.requireAuth, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const metrics = await (0, dashboardData_1.getDashboardMetrics)(userId);
        res.json({ success: true, ...metrics });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message || 'Failed to load dashboard' });
    }
});
app.use('/api/v1', apiV1);
app.get('/metrics', (req, res) => {
    const metrics = {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        env: process.env.NODE_ENV || 'development',
    };
    res.json(metrics);
});
// ==================================================
// SERVER
// ==================================================
app.listen(Number(port), '0.0.0.0', () => {
    logger.info({ port, mlEngineUrl: ML_ENGINE_URL }, 'Backend service running');
});
//# sourceMappingURL=server.js.map