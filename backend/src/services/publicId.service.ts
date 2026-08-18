import prisma from '../lib/prisma';

export type PublicIdEntity =
  | 'USER'
  | 'PROJECT'
  | 'ORG'
  | 'DATASET'
  | 'JOB'
  | 'PASSPORT'
  | 'TICKET'
  | 'TRIAL'
  | 'AGENT'
  | 'APPROVAL'
  | 'LABELING'
  | 'FINETUNE'
  | 'CREDENTIAL'
  | 'VECTOR'
  | 'EVAL'
  | 'LEAD'
  | 'TEMPLATE'
  | 'MODEL'
  | 'EXPERIMENT'
  | 'OPERATIONS'
  | 'SUPPLIER'
  | 'MATERIALLOT'
  | 'LEANWASTE'
  | 'KAIZEN'
  | 'FIVESAUDIT'
  | 'AIINSIGHT'
  | 'NOTIFICATION'
  | 'SHARELINK'
  | 'SECURITY'
  | 'IDEMPOTENCY'
  | string;

export const PUBLIC_ID_REGEX = /^MODLIQ(ER)?-[A-Z0-9_-]+-\d{8}(-\d{6})?-\d{4,}$/;

export function isValidPublicId(publicId: string): boolean {
  if (!publicId || typeof publicId !== 'string') return false;
  return PUBLIC_ID_REGEX.test(publicId.trim());
}

// In-memory fallback sequences if DB is offline or scaling
const memorySequences = new Map<string, number>();

function formatDateTimeKeys(dateObj?: Date): { dateKey: string; timeKey: string } {
  const d = dateObj || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dateKey = `${year}${month}${day}`;

  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  const secs = String(d.getSeconds()).padStart(2, '0');
  const timeKey = `${hours}${mins}${secs}`;

  return { dateKey, timeKey };
}

/**
 * Universal Platform Public ID Generator
 * Format: MODLIQER-{ENTITY_NAME}-{YYYYMMDD}-{HHMMSS}-{XXXXX}
 * XXXXX increments in order from 00001 to 99999 per entity & date.
 */
export async function generatePublicId(entity: PublicIdEntity, date?: Date): Promise<string> {
  const { dateKey, timeKey } = formatDateTimeKeys(date);
  const normalizedEntity = String(entity).toUpperCase().replace(/[^A-Z0-9]/g, '');
  let seq = 1;

  try {
    const existing = await prisma.publicIdSequence.findUnique({
      where: {
        entityType_dateKey: {
          entityType: normalizedEntity,
          dateKey,
        },
      },
    });

    if (!existing) {
      await prisma.publicIdSequence.create({
        data: {
          entityType: normalizedEntity,
          dateKey,
          nextSeq: 2,
        },
      });
      seq = 1;
    } else {
      seq = existing.nextSeq;
      await prisma.publicIdSequence.update({
        where: { id: existing.id },
        data: { nextSeq: seq + 1 },
      });
    }
  } catch (err) {
    // Fallback to in-memory sequence increment if DB is unreachable or transaction conflicts
    const key = `${normalizedEntity}_${dateKey}`;
    const currentSeq = memorySequences.get(key) || 1;
    seq = currentSeq;
    memorySequences.set(key, currentSeq + 1);
  }

  const seqStr = String(seq).padStart(5, '0');
  return `MODLIQER-${normalizedEntity}-${dateKey}-${timeKey}-${seqStr}`;
}

export async function generateLeadPublicId(dateObj?: Date): Promise<string> {
  return generatePublicId('LEAD', dateObj);
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
