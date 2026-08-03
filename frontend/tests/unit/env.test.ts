import { describe, it, expect } from 'vitest';
import { API_BASE_URL, getApiUrl } from '../../src/lib/config/env';

describe('Frontend Environment Config', () => {
  it('should resolve API_BASE_URL cleanly', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
  });

  it('should format endpoint URLs properly', () => {
    const url = getApiUrl('/api/v1/projects');
    expect(url).toContain('/api/v1/projects');
  });
});
