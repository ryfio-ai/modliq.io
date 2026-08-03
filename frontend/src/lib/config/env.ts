// Centralized environment configuration for Modliq Frontend
// Single source of truth for API base URL across all service modules.

const isProduction = process.env.NODE_ENV === 'production';
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (isProduction && !rawApiUrl) {
  throw new Error(
    '[FATAL CONFIG ERROR] NEXT_PUBLIC_API_URL is unset in production build environment! ' +
    'Please set NEXT_PUBLIC_API_URL in .env.production or environment settings.'
  );
}

export const API_BASE_URL = rawApiUrl || 'http://localhost:3001';

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
