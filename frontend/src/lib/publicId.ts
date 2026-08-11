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
  | 'APPROVAL';

const PREFIX_MAP: Record<PublicIdEntity, string> = {
  USER: 'MODLIQ-USER',
  PROJECT: 'MODLIQ-PROJECT',
  ORG: 'MODLIQ-ORG',
  DATASET: 'MODLIQ-DATASET',
  JOB: 'MODLIQ-JOB',
  PASSPORT: 'MODLIQ-PASSPORT',
  TICKET: 'MODLIQ-TICKET',
  TRIAL: 'MODLIQ-TRIAL',
  AGENT: 'MODLIQ-AGENT',
  APPROVAL: 'MODLIQ-APPROVAL',
};

export function formatDateKey(dateObj?: Date): string {
  const d = dateObj || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Generates client-side public ID matching the sequential format:
 * MODLIQ-PASSPORT-YYYYMMDD-1000 to 9999
 * MODLIQ-USER-YYYYMMDD-1000 to 9999
 */
export function generateClientPublicId(entity: PublicIdEntity, seqNum: number = 1000, date?: Date): string {
  const dateKey = formatDateKey(date);
  const prefix = PREFIX_MAP[entity] || `MODLIQ-${entity}`;
  const seqPadded = String(seqNum).padStart(4, '0');
  return `${prefix}-${dateKey}-${seqPadded}`;
}

export function isValidPublicId(publicId: string): boolean {
  if (!publicId || typeof publicId !== 'string') return false;
  return /^MODLIQ-(USER|PROJECT|ORG|DATASET|JOB|PASSPORT|TICKET|TRIAL|AGENT|APPROVAL)-\d{8}-\d{4,}$/.test(publicId.trim());
}
