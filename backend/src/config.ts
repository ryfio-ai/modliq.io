import { z } from 'zod';

const schema = z.object({
  NODE_ENV:             z.enum(['development','production']).default('development'),
  PORT:                 z.coerce.number().default(5000),
  ML_ENGINE_URL:        z.string().url().default('http://localhost:8000'),
  CLIENT_ORIGIN:        z.string().default('http://localhost:3000'),
  REQUEST_TIMEOUT_MS:   z.coerce.number().default(30000),
  DATABASE_URL:         z.string().default('mongodb://localhost:27017/modliq'),
  REDIS_URL:            z.string().default('redis://localhost:6379'),
  JWT_SECRET:           z.string().min(16).default('local-dev-secret-minimum-32-chars-long'),
  ML_INTERNAL_API_KEY:  z.string().default('local-dev-key'),
});

export const config = schema.parse(process.env);
