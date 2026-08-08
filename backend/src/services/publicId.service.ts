import prisma from '../lib/prisma';

export type PublicIdEntity =
  | 'USER'
  | 'PROJECT'
  | 'ORG'
  | 'DATASET'
  | 'JOB'
  | 'PASSPORT'
  | 'TICKET'
  | 'TRIAL';

const PREFIX_MAP: Record<PublicIdEntity, string> = {
  USER: 'MODLIQ-USER',
  PROJECT: 'MODLIQ-PROJECT',
  ORG: 'MODLIQ-ORG',
  DATASET: 'MODLIQ-DATASET',
  JOB: 'MODLIQ-JOB',
  PASSPORT: 'MODLIQ-PASSPORT',
  TICKET: 'MODLIQ-TICKET',
  TRIAL: 'MODLIQ-TRIAL',
};

// In-memory fallback sequences if DB is offline or scaling
const memorySequences = new Map<string, number>();

function formatDateKey(dateObj?: Date): string {
  const d = dateObj || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export async function generatePublicId(entity: PublicIdEntity, date?: Date): Promise<string> {
  const dateKey = formatDateKey(date);
  const prefix = PREFIX_MAP[entity] || `MODLIQ-${entity}`;
  let seq = 1000;

  try {
    const existing = await prisma.publicIdSequence.findUnique({
      where: {
        entityType_dateKey: {
          entityType: entity,
          dateKey,
        },
      },
    });

    if (!existing) {
      const created = await prisma.publicIdSequence.create({
        data: {
          entityType: entity,
          dateKey,
          nextSeq: 1001,
        },
      });
      seq = 1000;
    } else {
      seq = existing.nextSeq;
      await prisma.publicIdSequence.update({
        where: { id: existing.id },
        data: { nextSeq: seq + 1 },
      });
    }
  } catch (err) {
    // Fallback to in-memory sequence increment if DB is unreachable or transaction conflicts
    const key = `${entity}_${dateKey}`;
    const currentSeq = memorySequences.get(key) || 1000;
    seq = currentSeq;
    memorySequences.set(key, currentSeq + 1);
  }

  return `${prefix}-${dateKey}-${seq}`;
}

export async function ensureUserPublicId(userId: string, createdAt?: Date): Promise<string> {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user && user.publicId) return user.publicId;

    const publicId = await generatePublicId('USER', createdAt);
    if (user) {
      await prisma.user.update({
        where: { id: userId },
        data: { publicId },
      });
    }
    return publicId;
  } catch {
    return await generatePublicId('USER', createdAt);
  }
}

export async function ensureProjectPublicId(projectId: string, createdAt?: Date): Promise<string> {
  try {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (project && project.publicId) return project.publicId;

    const publicId = await generatePublicId('PROJECT', createdAt);
    if (project) {
      await prisma.project.update({
        where: { id: projectId },
        data: { publicId },
      });
    }
    return publicId;
  } catch {
    return await generatePublicId('PROJECT', createdAt);
  }
}
