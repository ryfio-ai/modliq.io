import net from 'net';
import dns from 'dns';
import { promisify } from 'util';

const resolveDns = promisify(dns.resolve);

// Private / Internal IP ranges & loopback subnets to block
const BLOCKED_IP_PATTERNS = [
  /^127\./,                 // 127.0.0.0/8 (Loopback)
  /^10\./,                  // 10.0.0.0/8 (Private Network)
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12 (Private Network)
  /^192\.168\./,            // 192.168.0.0/16 (Private Network)
  /^169\.254\./,            // 169.254.0.0/16 (Link-Local / AWS/GCP Metadata)
  /^0\./,                   // 0.0.0.0/8
  /^::1$/,                  // IPv6 Loopback
  /^fe80:/i,                // IPv6 Link-Local
  /^fc00:/i,                // IPv6 Unique Local Address
  /^fd00:/i,                // IPv6 Unique Local Address
];

const BLOCKED_HOSTNAMES = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  '169.254.169.254',
  'metadata.google.internal',
  'metadata.aws.internal',
  'kubernetes.default.svc',
];

/**
 * Checks whether an IP address belongs to a private/internal range.
 */
export function isPrivateIp(ip: string): boolean {
  return BLOCKED_IP_PATTERNS.some((pattern) => pattern.test(ip));
}

/**
 * Validates a target database host or URL to prevent Server-Side Request Forgery (SSRF).
 * Returns true if target is safe; throws an error if target resolves to a restricted/internal endpoint.
 */
export async function validateConnectorHost(hostOrUrl: string): Promise<boolean> {
  const allowPrivate = process.env.ALLOW_PRIVATE_CONNECTORS === 'true';
  if (allowPrivate) {
    return true; // Explicitly allowed for private enterprise deployments
  }

  if (!hostOrUrl || typeof hostOrUrl !== 'string') {
    throw new Error('Invalid host target provided');
  }

  let hostname = hostOrUrl.trim().toLowerCase();

  // Strip protocol prefix if full URL supplied
  if (hostname.includes('://')) {
    try {
      const parsed = new URL(hostname);
      hostname = parsed.hostname;
    } catch {
      throw new Error('Invalid connection URL format');
    }
  }

  // Remove port if present (e.g. host:5432)
  if (hostname.includes(':') && !hostname.includes('[')) {
    hostname = hostname.split(':')[0];
  }

  // 1. Direct hostname block check
  if (BLOCKED_HOSTNAMES.includes(hostname)) {
    throw new Error(`SSRF Blocked: Connection to internal host '${hostname}' is forbidden.`);
  }

  // 2. Direct IP check
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error(`SSRF Blocked: Connection to private IP '${hostname}' is forbidden.`);
    }
    return true;
  }

  // 3. DNS Resolution check to prevent DNS rebinding to internal IPs
  try {
    const addresses = await resolveDns(hostname);
    for (const ip of addresses) {
      if (isPrivateIp(ip)) {
        throw new Error(`SSRF Blocked: Host '${hostname}' resolved to restricted IP '${ip}'.`);
      }
    }
  } catch (err: any) {
    if (err.message && err.message.startsWith('SSRF Blocked:')) {
      throw err;
    }
    // DNS resolution failure will be handled gracefully downstream by connector connection attempt
  }

  return true;
}
