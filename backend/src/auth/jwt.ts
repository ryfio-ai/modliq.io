import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'modliq-local-secret';
const JWT_EXPIRES = '7d';

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
  name?: string;
}

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export default { signJwt, verifyJwt };
