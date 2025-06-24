import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

interface JWTPayload {
  userID: string;
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
    (req as AuthenticatedRequest).userId = decoded.userID;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export { authenticate };