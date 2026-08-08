import express from 'express';
import http from 'http';
import authRoutes from '../src/routes/auth.routes';
import jwt from '../src/auth/jwt';

async function runAuthTests() {
  console.log('--------------------------------------------------');
  console.log('Running Backend Sign In & Sign Up Test Suite');
  console.log('--------------------------------------------------\n');

  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const port = address.port;
  const baseUrl = `http://127.0.0.1:${port}/api/auth`;

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✓ PASSED: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAILED: ${testName}${detail ? ` (${detail})` : ''}`);
      failed++;
    }
  }

  try {
    // --------------------------------------------------
    // 1. JWT Unit Tests
    // --------------------------------------------------
    console.log('[Group 1: JWT Signing & Verification]');
    const testPayload = { userId: 'usr_test_123', email: 'test@example.com', role: 'USER', name: 'Test User' };
    const token = jwt.signJwt(testPayload);
    assert(typeof token === 'string' && token.length > 20, 'JWT token generation');

    const decoded = jwt.verifyJwt(token);
    assert(decoded !== null && decoded.userId === 'usr_test_123' && decoded.email === 'test@example.com', 'JWT token verification with valid payload');

    const tampered = token.slice(0, -5) + 'xxxxx';
    const tamperedDecoded = jwt.verifyJwt(tampered);
    assert(tamperedDecoded === null, 'JWT verification fails on tampered token');

    // --------------------------------------------------
    // 2. GET /api/auth/me Endpoint Tests
    // --------------------------------------------------
    console.log('\n[Group 2: GET /api/auth/me Endpoint]');
    
    // Missing Auth Header
    let res = await fetch(`${baseUrl}/me`);
    assert(res.status === 401, 'Me endpoint rejects request with missing Authorization header');

    // Invalid Token
    res = await fetch(`${baseUrl}/me`, {
      headers: { Authorization: 'Bearer invalid.token.value' },
    });
    assert(res.status === 401, 'Me endpoint rejects request with invalid Bearer token');

    // Valid Demo Token
    const demoToken = jwt.signJwt({ userId: 'demo-user-static-backend', email: 'demo@modliq.com', role: 'USER', name: 'Demo User' });
    res = await fetch(`${baseUrl}/me`, {
      headers: { Authorization: `Bearer ${demoToken}` },
    });
    const demoData = await res.json();
    assert(res.status === 200 && demoData.email === 'demo@modliq.com', 'Me endpoint returns user profile for valid Demo token');

    // Valid Admin Token
    const adminToken = jwt.signJwt({ userId: 'admin_user_static', email: 'admin@modliq.io', role: 'ADMIN', name: 'Platform Admin' });
    res = await fetch(`${baseUrl}/me`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminData = await res.json();
    assert(res.status === 200 && adminData.role === 'ADMIN' && adminData.dashboardPath === '/admin', 'Me endpoint returns Admin profile and /admin dashboard route');

    // --------------------------------------------------
    // 3. POST /api/auth/login Endpoint Tests (Sign In)
    // --------------------------------------------------
    console.log('\n[Group 3: POST /api/auth/login (Sign In)]');

    // Missing Email / Password
    res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '' }),
    });
    assert(res.status === 400, 'Login rejects missing email/password with HTTP 400');

    // Invalid Credentials (Non-existent Email)
    res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nonexistent@modliq.com', password: 'wrongpassword' }),
    });
    assert(res.status === 401, 'Login rejects non-existent email with HTTP 401');

    // Invalid Password for existing account
    res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@modliq.io', password: 'wrongpassword' }),
    });
    assert(res.status === 401, 'Login rejects incorrect password for existing account with HTTP 401');

    // Successful Demo User Login
    res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@modliq.com', password: 'modliqdemo' }),
    });
    const loginDemoRes = await res.json();
    assert(
      res.status === 200 && typeof loginDemoRes.token === 'string' && loginDemoRes.user.email === 'demo@modliq.com',
      'Login succeeds for demo user and returns JWT token + user object'
    );

    // Successful Admin Login
    res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@modliq.io', password: process.env.ADMIN_PASSWORD || 'modliq123' }),
    });
    const loginAdminRes = await res.json();
    assert(
      res.status === 200 && loginAdminRes.user.role === 'ADMIN' && loginAdminRes.user.dashboardPath === '/admin',
      'Login succeeds for Admin user and returns role ADMIN & dashboardPath /admin'
    );

    // --------------------------------------------------
    // 4. POST /api/auth/signup Endpoint Tests (Sign Up)
    // --------------------------------------------------
    console.log('\n[Group 4: POST /api/auth/signup (Sign Up)]');

    const testUserEmail = `engineer_${Date.now()}@factory.com`;
    const testUserPass = 'securepass123';
    const testUserName = 'Quality Specialist';

    // Missing Email/Password
    res = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: testUserName, email: '' }),
    });
    assert(res.status === 400, 'Signup rejects missing email/password with HTTP 400');

    // Successful New User Registration
    res = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: testUserName, email: testUserEmail, password: testUserPass }),
    });
    const signupRes = await res.json();
    assert(
      res.status === 200 && signupRes.user.email === testUserEmail && typeof signupRes.token === 'string',
      'Signup creates new user and returns valid token and user object'
    );

    // Duplicate Email Signup Rejection
    res = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: testUserName, email: testUserEmail, password: testUserPass }),
    });
    assert(res.status === 409, 'Signup rejects duplicate email registration with HTTP 409');

    // Login with newly created user
    res = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUserEmail, password: testUserPass }),
    });
    const newlyCreatedLoginRes = await res.json();
    assert(
      res.status === 200 && newlyCreatedLoginRes.user.email === testUserEmail,
      'Newly registered user can successfully log in with their credentials'
    );

    // --------------------------------------------------
    // 5. POST /api/auth/logout Endpoint Tests
    // --------------------------------------------------
    console.log('\n[Group 5: POST /api/auth/logout]');
    res = await fetch(`${baseUrl}/logout`, { method: 'POST' });
    const logoutRes = await res.json();
    assert(res.status === 200 && logoutRes.success === true, 'Logout endpoint returns success: true');

  } catch (err: any) {
    console.error('Fatal error during auth test suite:', err);
    failed++;
  } finally {
    server.close();
    console.log('\n--------------------------------------------------');
    console.log(`Backend Auth Test Results: ${passed} PASSED, ${failed} FAILED`);
    console.log('--------------------------------------------------\n');
    if (failed > 0) {
      process.exit(1);
    }
  }
}

runAuthTests();
