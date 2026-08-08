import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from '../auth/jwt';
import prisma from '../lib/prisma';
import { seedAdmin } from '../scripts/seedAdmin';

const router = Router();

const DEMO_USER_ID = 'demo-user-static-backend';
const DEMO_EMAIL = 'demo@modliq.com';
const DEMO_PASSWORD = 'modliqdemo';

// Seed demo user and admin user on startup
(async () => {
  try {
    await seedAdmin();

    const existingDemo = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });
    if (!existingDemo) {
      const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
      await prisma.user.create({
        data: {
          id: DEMO_USER_ID,
          email: DEMO_EMAIL,
          name: 'Demo User',
          password: passwordHash,
          isDemo: true,
          role: 'USER',
        },
      });
      console.log('[auth] Demo user seeded into database.');
    }
  } catch (err) {
    console.error('[auth] Failed to seed users:', (err as any)?.message || err);
  }
})();

// In-memory fallback users if Prisma is unavailable
const memoryUsers = new Map<string, any>();
(async () => {
  const demoHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  memoryUsers.set(DEMO_EMAIL, {
    id: DEMO_USER_ID,
    _id: DEMO_USER_ID,
    email: DEMO_EMAIL,
    name: 'Demo User',
    password: demoHash,
    role: 'USER',
    isDemo: true,
  });

  const adminPassword = process.env.ADMIN_PASSWORD || 'modliq123';
  const adminHash = await bcrypt.hash(adminPassword, 10);
  memoryUsers.set('admin@modliq.io', {
    id: 'admin_user_static',
    _id: 'admin_user_static',
    email: 'admin@modliq.io',
    name: 'Platform Admin',
    password: adminHash,
    role: 'ADMIN',
    isDemo: false,
  });
})();

async function findUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return user;
  } catch {
    // Prisma query failed, fall back to memory
  }
  return memoryUsers.get(email) || null;
}

async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) return user;
  } catch {
    // Prisma query failed, fall back to memory
  }
  for (const u of memoryUsers.values()) {
    if (u.id === id || u._id === id) return u;
  }
  return null;
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existing = await findUser(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const role = email === 'admin@modliq.io' ? 'ADMIN' : 'USER';
    let user: any;

    try {
      user = await prisma.user.create({
        data: {
          id: userId,
          email,
          name: name || email.split('@')[0],
          password: passwordHash,
          role,
          isDemo: false,
        },
      });

      // Create default Organization and Project for normal user
      if (role === 'USER') {
        const org = await prisma.organization.create({
          data: {
            name: `${user.name || 'Default'}'s Factory`,
            slug: `org-${userId}`,
            ownerUserId: userId,
          },
        });

        await prisma.organizationMember.create({
          data: {
            organizationId: org.id,
            userId,
            role: 'OWNER',
            status: 'ACTIVE',
          },
        });

        await prisma.project.create({
          data: {
            userId,
            organizationId: org.id,
            name: 'Default Plant Project',
            status: 'draft',
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { defaultOrgId: org.id },
        });
      }
    } catch (dbErr) {
      // Fallback in-memory
      user = { id: userId, email, name: name || email.split('@')[0], role, isDemo: false };
      memoryUsers.set(email, { ...user, password: passwordHash });
    }

    const token = jwt.signJwt({ userId: user.id, email: user.email || '', role: user.role, name: user.name });
    const dashboardPath = user.role === 'ADMIN' ? '/admin' : `/${user.id}/modliq-console/dashboard`;

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        dashboardPath,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUser(email);
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userId = user.id || user._id;
    const role = user.role || (user.email === 'admin@modliq.io' ? 'ADMIN' : 'USER');
    const token = jwt.signJwt({ userId, email: user.email || '', role, name: user.name });
    const dashboardPath = role === 'ADMIN' ? '/admin' : `/${userId}/modliq-console/dashboard`;

    return res.json({
      token,
      user: {
        id: userId,
        email: user.email,
        name: user.name,
        role,
        dashboardPath,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Invalid email or password' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const token = authHeader.slice(7);
    const payload = jwt.verifyJwt(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const userId = user.id || user._id;
    const role = user.role || (user.email === 'admin@modliq.io' ? 'ADMIN' : 'USER');
    const dashboardPath = role === 'ADMIN' ? '/admin' : `/${userId}/modliq-console/dashboard`;

    return res.json({
      id: userId,
      email: user.email,
      name: user.name,
      role,
      dashboardPath,
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Failed to load user' });
  }
});

router.post('/logout', (_req, res) => {
  return res.json({ success: true });
});

export default router;
