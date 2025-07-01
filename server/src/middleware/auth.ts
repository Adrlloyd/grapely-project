import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  name: string;
}

interface AuthenticatedRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    (req as AuthenticatedRequest).userId = decoded.userId;
    next();
  } catch (error) {
    console.warn('Invalid token.');
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


function optionalAuthenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET!) as { userId: string };
    (req as AuthenticatedRequest).userId = decoded.userId;
  } catch (error) {
    console.warn('Invalid token, continuing without userId.');
  }

  next();
}


export { authenticate, optionalAuthenticate };
export type { AuthenticatedRequest }