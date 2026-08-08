import { describe, it, expect } from 'vitest';
import { signClientJwt, verifyJwt, getAuthFromHeaders } from '../../src/lib/auth';
import { isAdmin, getUserDashboardPath, getPostLoginRedirect } from '../../src/lib/auth/redirects';

describe('Frontend Auth System Unit Tests', () => {
  describe('JWT Utilities (client-side decoding & fallback token creation)', () => {
    it('should generate a valid JWT format string', () => {
      const payload = { userId: 'usr_client_1', email: 'engineer@factory.com', name: 'Factory User', role: 'USER' };
      const token = signClientJwt(payload);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should verify and decode valid client JWT tokens', () => {
      const payload = { userId: 'usr_client_2', email: 'qa@company.com', name: 'QA Lead', role: 'USER' };
      const token = signClientJwt(payload);
      const decoded = verifyJwt(token);

      expect(decoded).not.toBeNull();
      expect(decoded?.userId).toBe('usr_client_2');
      expect(decoded?.email).toBe('qa@company.com');
      expect(decoded?.name).toBe('QA Lead');
      expect(decoded?.role).toBe('USER');
    });

    it('should assign ADMIN role automatically to admin@modliq.io', () => {
      const payload = { userId: 'admin_user_static', email: 'admin@modliq.io', name: 'Platform Admin' };
      const token = signClientJwt(payload);
      const decoded = verifyJwt(token);

      expect(decoded?.role).toBe('ADMIN');
    });

    it('should return null when parsing invalid or malformed tokens', () => {
      expect(verifyJwt('')).toBeNull();
      expect(verifyJwt('invalidtokenstring')).toBeNull();
      expect(verifyJwt('header.invalidjsonpayload.signature')).toBeNull();
    });

    it('should extract Bearer tokens from request headers correctly', () => {
      const headers = new Headers();
      headers.set('authorization', 'Bearer my_mock_session_token_123');

      const extracted = getAuthFromHeaders(headers);
      expect(extracted).toBe('my_mock_session_token_123');

      const emptyHeaders = new Headers();
      expect(getAuthFromHeaders(emptyHeaders)).toBeNull();
    });
  });

  describe('Auth Redirect & Role Helper Logic', () => {
    it('should correctly identify admin users', () => {
      expect(isAdmin(null)).toBe(false);
      expect(isAdmin(undefined)).toBe(false);
      expect(isAdmin({ id: 'u1', role: 'USER', email: 'user@modliq.com' })).toBe(false);

      expect(isAdmin({ id: 'admin1', role: 'ADMIN', email: 'admin@other.com' })).toBe(true);
      expect(isAdmin({ id: 'admin2', role: 'USER', email: 'admin@modliq.io' })).toBe(true);
    });

    it('should calculate correct user dashboard paths', () => {
      expect(getUserDashboardPath('')).toBe('/login');
      expect(getUserDashboardPath('usr_890')).toBe('/usr_890/modliq-console/dashboard');
    });

    it('should calculate post-login redirects based on user role', () => {
      expect(getPostLoginRedirect(null)).toBe('/login');

      // Admin User -> /admin
      expect(getPostLoginRedirect({ id: 'admin_1', email: 'admin@modliq.io', role: 'ADMIN' })).toBe('/admin');

      // Regular User -> /usr_999/modliq-console/dashboard
      expect(getPostLoginRedirect({ id: 'usr_999', email: 'engineer@plant.com', role: 'USER' })).toBe('/usr_999/modliq-console/dashboard');
    });
  });

  describe('Sign Up Form Validation Rules', () => {
    function validateSignup(name: string, email: string, pass: string, confirmPass: string): string | null {
      if (!name || !email || !pass) return 'All fields are required';
      if (pass !== confirmPass) return 'Passwords do not match';
      if (pass.length < 6) return 'Password must be at least 6 characters';
      return null;
    }

    it('should reject non-matching password confirmation', () => {
      const err = validateSignup('Jane', 'jane@factory.com', 'pass123', 'pass456');
      expect(err).toBe('Passwords do not match');
    });

    it('should reject passwords shorter than 6 characters', () => {
      const err = validateSignup('Jane', 'jane@factory.com', '12345', '12345');
      expect(err).toBe('Password must be at least 6 characters');
    });

    it('should accept valid signup details', () => {
      const err = validateSignup('Jane', 'jane@factory.com', 'secret123', 'secret123');
      expect(err).toBeNull();
    });
  });
});
