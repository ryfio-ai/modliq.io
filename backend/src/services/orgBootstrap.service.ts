import { prisma } from '../lib/prisma';

export async function ensureUserOrganization(user: { userId: string; email: string; name?: string }) {
  if (!user || !user.userId) return null;

  // Check if user already has an active OrganizationMember entry
  const existingMembership = await prisma.organizationMember.findFirst({
    where: { userId: user.userId },
  });

  if (existingMembership) {
    const org = await prisma.organization.findUnique({
      where: { id: existingMembership.organizationId },
    });
    if (org) return org;
  }

  // Create default workspace name and slug
  const baseName = user.name || user.email.split('@')[0] || 'Manufacturer';
  const orgName = `${baseName}'s Workspace`;
  const baseSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const uniqueSuffix = Math.random().toString(36).substring(2, 7);
  const slug = `${baseSlug}-${uniqueSuffix}`;

  // Create Organization in Prisma
  const organization = await prisma.organization.create({
    data: {
      name: orgName,
      slug,
      ownerUserId: user.userId,
      industry: 'Manufacturing',
      companySize: '10-50',
    },
  });

  // Create OrganizationMember with role OWNER
  await prisma.organizationMember.create({
    data: {
      organizationId: organization.id,
      userId: user.userId,
      role: 'OWNER',
      status: 'ACTIVE',
      invitedEmail: user.email,
    },
  });

  // Update defaultOrgId on user record
  await prisma.user.update({
    where: { id: user.userId },
    data: { defaultOrgId: organization.id },
  }).catch(() => null);

  // Initialize DEMO entitlement if missing
  const defaultModules = JSON.stringify({
    coreOptimization: true,
    qualityStudio: true,
    operations: true,
    supplyChain: true,
    lean: true,
    aiCopilot: true,
    qualityPassport: true,
    databaseConnectors: true,
    buyerShareLinks: true,
    adminConsole: true,
  });

  const defaultLimits = JSON.stringify({
    projects: 10,
    datasets: 50,
    monthlyOptimizations: 200,
    monthlyAiCalls: 500,
    connectors: 10,
    passportExports: 50,
    maxUploadMb: 100,
  });

  await prisma.entitlement.create({
    data: {
      organizationId: organization.id,
      plan: 'DEMO',
      modulesJson: defaultModules,
      limitsJson: defaultLimits,
    },
  }).catch(() => null);

  // Initialize onboarding state
  await prisma.onboardingState.create({
    data: {
      userId: user.userId,
      organizationId: organization.id,
      completedJson: JSON.stringify([]),
      dismissed: false,
    },
  }).catch(() => null);

  return organization;
}
