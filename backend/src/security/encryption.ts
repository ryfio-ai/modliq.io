import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const DEFAULT_KEY_FALLBACK = 'modliq_default_32byte_sec_key!!'; // Fallback for dev only

function getEncryptionKey(): Buffer {
  const secret = process.env.CONNECTOR_ENCRYPTION_KEY || DEFAULT_KEY_FALLBACK;
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts sensitive credential payload using AES-256-GCM.
 * Output format: "iv_hex:auth_tag_hex:encrypted_hex"
 */
export function encryptSecret(value: Record<string, any> | string): string {
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(12); // 96-bit IV for AES-GCM
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    const text = typeof value === 'string' ? value : JSON.stringify(value);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (err: any) {
    console.error('Encryption failed:', err.message);
    throw new Error('Failed to encrypt connector credentials securely.');
  }
}

/**
 * Decrypts AES-256-GCM encrypted payload string back to original object or string.
 */
export function decryptSecret<T = any>(encryptedPayload: string): T {
  try {
    const key = getEncryptionKey();
    const parts = encryptedPayload.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted payload format');
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
      return JSON.parse(decrypted) as T;
    } catch {
      return decrypted as unknown as T;
    }
  } catch (err: any) {
    console.error('Decryption failed:', err.message);
    throw new Error('Failed to decrypt connector credentials.');
  }
}

/**
 * Returns a safe, masked version of connector configuration for UI display.
 * Never exposes passwords, secret keys, or connection strings containing passwords.
 */
export function maskConfig(config: Record<string, any>): Record<string, any> {
  if (!config) return {};
  const masked: Record<string, any> = { ...config };

  const SENSITIVE_KEYS = ['password', 'secret', 'key', 'token', 'connectionString', 'uri', 'connection_string'];

  for (const k of Object.keys(masked)) {
    const lowerKey = k.toLowerCase();
    if (SENSITIVE_KEYS.some((s) => lowerKey.includes(s))) {
      if (typeof masked[k] === 'string' && (lowerKey.includes('string') || lowerKey.includes('uri'))) {
        // Mask password portion of connection string e.g. postgresql://user:PASS@host:5432/db -> postgresql://user:***@host:5432/db
        masked[k] = masked[k].replace(/(:[^:@\s]+)@/, ':****@');
      } else {
        masked[k] = '••••••••';
      }
    }
  }

  return masked;
}
