import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';

export async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@modliq.io';
  const adminPassword = process.env.ADMIN_PASSWORD || 'modliq123';

  try {
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      const adminUser = await prisma.user.create({
        data: {
          id: 'admin_user_static',
          email: adminEmail,
          name: 'Platform Admin',
          password: passwordHash,
          role: 'ADMIN',
          isDemo: false,
        },
      });
      console.log(`[seedAdmin] Admin user created (${adminUser.email}, role: ${adminUser.role}).`);
      return adminUser;
    } else {
      let updated = existing;
      if (existing.role !== 'ADMIN') {
        updated = await prisma.user.update({
          where: { email: adminEmail },
          data: { role: 'ADMIN' },
        });
        console.log(`[seedAdmin] Updated user ${adminEmail} role to ADMIN.`);
      } else {
        console.log(`[seedAdmin] Admin user ${adminEmail} already exists with role ADMIN.`);
      }
      return updated;
    }
  } catch (err: any) {
    console.error('[seedAdmin] Failed to seed admin user:', err?.message || err);
    return null;
  }
}

if (require.main === module) {
  seedAdmin()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
