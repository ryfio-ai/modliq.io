// Centralized environment configuration for Modliq Frontend
// Single source of truth for API base URL across all service modules.

const rawApiUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://modliq-backend.onrender.com').trim();

export const API_BASE_URL = /^https?:\/\//.test(rawApiUrl)
  ? rawApiUrl
  : `https://${rawApiUrl}`;

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
