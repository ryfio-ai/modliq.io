import { Worker, Job } from 'bullmq';
import { mlClient } from './mlClient';
import { config } from '../config';
import { updateOptimizationJobDb } from '../db/optimizationJobs';

interface TrainingJobData {
  jobId:        string;
  datasetPath:  string;
  targetColumn: string;
  features:     string[];
  taskType:     string;
  objective:    string;
  threshold:    number | null;
  constraints:  Record<string, any>;
  monthlyVolume: number;
  unitValue:    number;
  isDemoMode:   boolean;
}

const STEPS = [
  'Loading data',
  'Profiling dataset',
  'Detecting task type',
  'Training algorithms',
  'Finding best model',
  'Optimizing settings',
  'Identifying key drivers',
  'Calculating business impact',
  'Generating SOP',
  'Complete',
];

async function updateStep(jobId: string, step: string, progress: number) {
  try {
    await updateOptimizationJobDb(jobId, {
      status: 'running',
      stage: step,
      progress: progress,
    });
  } catch (e) {
    console.warn(`[Worker] Step update skipped for job ${jobId}:`, e);
  }
}

export const worker = new Worker(
  'modliq-training',
  async (job: any) => {
    const { jobId } = job.data;

    try {
      // Step progress updates
      for (let i = 0; i < STEPS.length - 1; i++) {
        await updateStep(jobId, STEPS[i], Math.round((i / STEPS.length) * 90));
        await new Promise(r => setTimeout(r, 200));
      }

      // Call ML engine
      const response = await mlClient.post('/train', {
        dataset_path:   job.data.datasetPath,
        target_column:  job.data.targetColumn,
        features:       job.data.features,
        task_type:      job.data.taskType,
        objective:      job.data.objective,
        threshold:      job.data.threshold,
        constraints:    job.data.constraints,
        random_seed:    42,
        max_trials:     30,
        monthly_volume: job.data.monthlyVolume,
        unit_value:     job.data.unitValue,
        is_demo:        job.data.isDemoMode,
      });

      const result = response.data;

      // Save completed result
      await updateOptimizationJobDb(jobId, {
        status:      'complete',
        stage:       'Complete',
        progress:    100,
        resultJson:  JSON.stringify(result),
      });

    } catch (err: any) {
      console.error(`[Worker] Job ${jobId} failed:`, err.message);
      await updateOptimizationJobDb(jobId, {
        status:       'failed',
        stage:        'failed',
        error:        err.message ?? 'ML engine failed',
      });
      throw err;
    }
  },
  { connection: { url: config.REDIS_URL } }
);
