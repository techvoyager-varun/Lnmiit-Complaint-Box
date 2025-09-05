import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  // eslint-disable-next-line no-console
  console.error(err);
  if (typeof err === 'object' && err && 'status' in err) {
    const status = (err as any).status ?? 500;
    const message = (err as any).message ?? 'Server error';
    res.status(status).json({ message });
    return;
  }
  res.status(500).json({ message: 'Server error' });
}


