import prisma from '../lib/prisma';

const memoryStore = new Map<string, any>();

export async function saveOptimization(id: string, data: any) {
  const { userId, ...rest } = data || {};
  const toStore: any = { ...rest };
  if (toStore.result && typeof toStore.result === 'object') {
    toStore.result = JSON.stringify(toStore.result);
  }

  memoryStore.set(id, { id, userId, ...toStore, updatedAt: new Date() });

  try {
    let connectUser = false;
    if (userId && typeof userId === 'string' && /^[0-9a-fA-F]{24}$/.test(userId)) {
      const userExists = await (prisma as any).user?.findUnique({ where: { id: userId } });
      if (userExists) connectUser = true;
    }

    const existing = await (prisma as any).optimizationRun?.findUnique({
      where: { id },
    });

    if (existing) {
      await (prisma as any).optimizationRun?.update({
        where: { id },
        data: { ...toStore, updatedAt: new Date() },
      });
    } else {
      await (prisma as any).optimizationRun?.create({
        data: {
          id,
          ...(connectUser ? { user: { connect: { id: userId } } } : {}),
          ...toStore,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  } catch (err: any) {
    console.warn(`[optimizationStore] Prisma save skipped for run ${id}:`, err.message);
  }

  return data;
}

export async function getOptimization(id: string) {
  try {
    const res = await (prisma as any).optimizationRun?.findUnique({
      where: { id },
    });
    if (res) return res;
  } catch (err: any) {
    console.warn(`[optimizationStore] Prisma get skipped for run ${id}:`, err.message);
  }
  return memoryStore.get(id) || null;
}

export async function listOptimizations() {
  try {
    const list = await (prisma as any).optimizationRun?.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (list && list.length > 0) return list;
  } catch (err: any) {
    console.warn('[optimizationStore] Prisma list skipped:', err.message);
  }
  return Array.from(memoryStore.values());
}
