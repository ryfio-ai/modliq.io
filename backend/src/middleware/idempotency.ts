import { Request, Response, NextFunction } from 'express';

const idempotencyCache = new Map<string, { status: number; body: any; expiresAt: number }>();

// Periodic TTL cleanup every 1 hour to prevent memory expansion
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, item] of idempotencyCache.entries()) {
      if (item.expiresAt <= now) {
        idempotencyCache.delete(key);
      }
    }
  }, 60 * 60 * 1000);
}

/**
 * Idempotency Middleware evaluating `Idempotency-Key` headers on POST endpoints.
 * Caches and replays responses for duplicate requests with matching keys.
 * Applies to:
 *  - Create optimization job (POST /api/v1/projects/:id/optimize)
 *  - Apply data cleaning (POST /api/v1/projects/:id/clean)
 *  - Import dataset (POST /api/v1/projects/:id/dataset)
 *  - Generate Quality Passport (POST /api/v1/projects/:id/quality-passport)
 *  - Create share link (POST /api/share/create)
 *  - Submit contact form (POST /api/v1/public/contact)
 *  - Create support ticket (POST /api/v1/admin/support/tickets)
 *  - Approve agent action (POST /api/v1/agent/approve)
 */
export async function idempotencyMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'POST') {
    return next();
  }

  const idempotencyKey = req.header('Idempotency-Key');
  if (!idempotencyKey) {
    return next();
  }

  const cacheKey = `${req.path}_${idempotencyKey}`;
  const now = Date.now();

  const cached = idempotencyCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    res.setHeader('X-Cache-Lookup', 'HIT');
    res.setHeader('X-Idempotency-Replayed', 'true');
    return res.status(cached.status).json(cached.body);
  }

  const originalJson = res.json.bind(res);
  res.json = function (body: any) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      idempotencyCache.set(cacheKey, {
        status: res.statusCode,
        body,
        expiresAt: now + 24 * 60 * 60 * 1000, // 24-hour TTL expiration
      });
    }
    return originalJson(body);
  };

  next();
}
