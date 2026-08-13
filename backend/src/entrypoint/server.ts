require('dotenv').config();

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import authRoutes from '../routes/auth.routes';
import projectsRoutes from '../routes/projects.routes';
import ingestionRoutes from '../routes/ingestion.routes';
import qualityPassportRoutes from '../routes/qualityPassport.routes';
import aiRoutes from '../routes/ai.routes';
import edaRoutes from '../routes/eda.routes';
import chartRoutes from '../routes/chart.routes';
import analyticsWorkflowRoutes from '../routes/analyticsWorkflow.routes';
import goalCrosscheckRoutes from '../routes/goalCrosscheck.routes';
import templateRoutes from '../routes/template.routes';
import legacyRoutes from '../routes/legacy.routes';
import publicRoutes from '../routes/public.routes';
import agentRoutes from '../routes/agent.routes';
import { initDb } from '../db/optimizationJobs';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
const port = process.env.PORT || 3001;
const ML_ENGINE_URL = process.env.ML_ENGINE_URL || 'http://127.0.0.1:8000';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://modliq.vercel.app';

const corsOrigins = process.env.NODE_ENV === 'production'
  ? [CLIENT_ORIGIN]
  : [CLIENT_ORIGIN, 'http://localhost:3000', 'http://localhost:5173'];

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.set('trust proxy', true);

console.log(`[backend] ML_ENGINE_URL=${ML_ENGINE_URL}`);
console.log(`[backend] CLIENT_ORIGIN=${CLIENT_ORIGIN}`);

// API V1 Routes
const apiV1 = express.Router();
apiV1.use('/projects', projectsRoutes);
apiV1.use('/projects/:projectId/goal', goalCrosscheckRoutes);
apiV1.use('/projects/:projectId/templates', templateRoutes);
apiV1.use('/projects/:projectId/quality-passport', qualityPassportRoutes);
apiV1.use('/projects/:projectId/datasets/:datasetId/eda', edaRoutes);
apiV1.use('/projects/:projectId/datasets/:datasetId/charts', chartRoutes);
apiV1.use('/datasets/:datasetId/charts', chartRoutes);
apiV1.use('/projects/:projectId/analytics', analyticsWorkflowRoutes);
apiV1.use('/projects/:projectId', ingestionRoutes);
apiV1.use('/projects/:projectId', agentRoutes);
apiV1.use('/', agentRoutes);
apiV1.use('/user', projectsRoutes);
apiV1.use('/ai', aiRoutes);
// Legacy routes: demo dataset, optimization, parse-goal, QC, dashboard
apiV1.use('/', legacyRoutes);
// Public routes (no auth required)
apiV1.use('/public', publicRoutes);
app.use('/api/v1', apiV1);
app.use('/api/auth', authRoutes);

// Legacy /dashboard alias (non-versioned)
app.use('/dashboard', (req, res) => res.redirect('/api/v1/dashboard'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`[backend] Modliq backend running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
