import { Queue } from 'bullmq';
import { config } from '../config';

export const trainingQueue = new Queue('modliq-training', {
  connection: { url: config.REDIS_URL },
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});
