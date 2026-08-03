import axios from 'axios';
import { config } from '../config';

export const mlClient = axios.create({
  baseURL: config.ML_ENGINE_URL,
  timeout: config.REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    'X-Modliq-Service-Key': config.ML_INTERNAL_API_KEY,
  },
});
