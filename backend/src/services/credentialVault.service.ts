import prisma from '../lib/prisma';
import { generatePublicId } from './publicId.service';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.CREDENTIAL_VAULT_KEY || 'modliq_secret_vault_key_32bytes_!!';

function encryptSecret(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32)), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptSecret(text: string): string {
  const parts = text.split(':');
  if (parts.length !== 2) return text;
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32)), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export interface CreateCredentialInput {
  userId: string;
  projectId?: string;
  name: string;
  type: 'CONNECTOR' | 'API' | 'STORAGE' | 'TOOL';
  secret: string;
  allowedTools?: string[];
}

export async function createCredentialReference(input: CreateCredentialInput) {
  const publicId = await generatePublicId('CREDENTIAL');
  const encryptedRef = encryptSecret(input.secret);

  return prisma.credentialReference.create({
    data: {
      publicId,
      userId: input.userId,
      projectId: input.projectId || null,
      name: input.name,
      type: input.type,
      encryptedRef,
      allowedToolsJson: input.allowedTools ? JSON.stringify(input.allowedTools) : null,
      status: 'ACTIVE',
    },
    select: {
      id: true,
      publicId: true,
      userId: true,
      projectId: true,
      name: true,
      type: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getCredentialReferences(userId: string, projectId?: string) {
  const refs = await prisma.credentialReference.findMany({
    where: {
      userId,
      ...(projectId ? { projectId } : {}),
    },
    select: {
      id: true,
      publicId: true,
      userId: true,
      projectId: true,
      name: true,
      type: true,
      allowedToolsJson: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return refs.map((r) => ({
    ...r,
    allowedTools: r.allowedToolsJson ? JSON.parse(r.allowedToolsJson) : ['*'],
  }));
}

export async function resolveCredentialServerSide(credentialId: string, toolName: string): Promise<string | null> {
  const ref = await prisma.credentialReference.findUnique({
    where: { id: credentialId },
  });

  if (!ref || ref.status !== 'ACTIVE') {
    throw new Error('Credential reference invalid or revoked');
  }

  if (ref.allowedToolsJson) {
    const allowed = JSON.parse(ref.allowedToolsJson) as string[];
    if (!allowed.includes('*') && !allowed.includes(toolName)) {
      throw new Error(`Tool '${toolName}' not authorized for credential '${ref.name}'`);
    }
  }

  return decryptSecret(ref.encryptedRef);
}

export async function revokeCredentialReference(credentialId: string) {
  return prisma.credentialReference.update({
    where: { id: credentialId },
    data: { status: 'REVOKED' },
  });
}
