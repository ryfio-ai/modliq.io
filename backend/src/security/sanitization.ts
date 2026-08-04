import { Request, Response, NextFunction } from 'express';

const DANGEROUS_NOSQL_OPERATORS = [
  '$ne',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$regex',
  '$where',
  '$function',
  '$expr',
  '$or',
  '$and',
  '$nor',
  '$not',
  '$elemMatch',
];

/**
 * Recursively inspects object keys for MongoDB query operators ($ne, $where, $regex, etc.)
 */
function containsNoSqlOperator(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || DANGEROUS_NOSQL_OPERATORS.includes(key)) {
      return true;
    }
    if (typeof obj[key] === 'object' && containsNoSqlOperator(obj[key])) {
      return true;
    }
  }

  return false;
}

/**
 * Sanitizes values for CSV/Excel export to prevent formula injection.
 * Neutralizes leading characters '=', '+', '-', '@', '\t', '\r'
 */
export function sanitizeFormulaValue(val: any): any {
  if (typeof val !== 'string') return val;

  const trimmed = val.trimStart();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${val}`; // Prefix with single quote so spreadsheet software treats it as literal text
  }
  return val;
}

/**
 * Express middleware to block NoSQL operator injection in query params and request body.
 */
export function noSqlInjectionProtection(req: Request, res: Response, next: NextFunction) {
  if (req.query && containsNoSqlOperator(req.query)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request: NoSQL operators are not permitted in query parameters.',
    });
  }

  if (req.body && containsNoSqlOperator(req.body)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request: NoSQL operators are not permitted in payload.',
    });
  }

  next();
}
