import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// In-memory model registry storage
const MODEL_REGISTRY: Record<string, any> = {
  "mod_rf_1": {
    modelId: "mod_rf_1",
    name: "Random Forest Classifier",
    algorithm: "RandomForestClassifier",
    taskType: "binary_classification",
    metrics: {
      accuracy: 0.942,
      f1Score: 0.938,
      cvMean: 0.935,
      cvStd: 0.012,
      trainingTimeSec: 1.45,
      inferenceTimeMs: 4.2
    },
    isDeployed: true,
    deploymentStage: "production"
  },
  "mod_xgb_2": {
    modelId: "mod_xgb_2",
    name: "XGBoost Classifier",
    algorithm: "XGBClassifier",
    taskType: "binary_classification",
    metrics: {
      accuracy: 0.928,
      f1Score: 0.925,
      cvMean: 0.921,
      cvStd: 0.015,
      trainingTimeSec: 2.10,
      inferenceTimeMs: 3.8
    },
    isDeployed: false,
    deploymentStage: "development"
  }
};

// List all models for user
router.get('/', async (req: any, res: any) => {
  res.json(Object.values(MODEL_REGISTRY));
});

// Get model details
router.get('/:modelId', async (req: any, res: any) => {
  const { modelId } = req.params;
  const model = MODEL_REGISTRY[modelId];

  if (!model) {
    return res.status(404).json({ error: 'Model not found' });
  }

  res.json(model);
});

// Deploy model to stage
router.post('/:modelId/deploy', async (req: any, res: any) => {
  const { modelId } = req.params;
  const schema = z.object({
    stage: z.enum(['development', 'staging', 'production']),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const { stage } = parsed.data;
  const model = MODEL_REGISTRY[modelId];

  if (!model) {
    return res.status(404).json({ error: 'Model not found' });
  }

  if (stage === 'production') {
    Object.values(MODEL_REGISTRY).forEach((m: any) => {
      m.isDeployed = false;
      m.deploymentStage = 'development';
    });
  }

  model.isDeployed = stage === 'production';
  model.deploymentStage = stage;

  res.json({
    modelId: model.modelId,
    deploymentStage: model.deploymentStage,
    isDeployed: model.isDeployed,
    message: `Model deployed to ${stage}`,
  });
});

// Compare models
router.get('/compare/:modelIds', async (req: any, res: any) => {
  const ids = req.params.modelIds.split(',');
  const selected = ids.map((id: string) => MODEL_REGISTRY[id]).filter(Boolean);
  res.json(selected);
});

export const modelsRouter = router;
