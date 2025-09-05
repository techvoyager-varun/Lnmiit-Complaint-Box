import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUserPayload {
  userId: string;
  role: 'student' | 'warden' | 'maintenance';
}

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUserPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = header.slice('Bearer '.length);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'JWT secret not configured' });
    return;
  }
  try {
    const payload = jwt.verify(token, secret) as AuthUserPayload;
    req.authUser = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(roles: AuthUserPayload['role'][]): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    if (!req.authUser || !roles.includes(req.authUser.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
}


