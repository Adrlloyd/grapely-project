import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  name: string;
}

interface AuthenticatedRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization header missing or invalid' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    (req as AuthenticatedRequest).userId = decoded.userId;
    next();
  } catch (error) {
    console.warn('Invalid token.');
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const optionalAuthenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    next();
    return;
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    (req as AuthenticatedRequest).userId = decoded.userId;
  } catch (error) {
    console.warn('Invalid token, continuing without userId.');
  }

  next();
};

export { authenticate, optionalAuthenticate };
export type { AuthenticatedRequest };