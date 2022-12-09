import { Request, Response, NextFunction } from 'express';

export type Role = 'Anonymous' | 'User' | 'Admin';

interface AuthUser {
  userId: string;
}

interface AuthRequest extends Request {
  authUser?: AuthUser;
}

interface AuthRequestHandler {
  (req: AuthRequest, res: Response, next: NextFunction): void;
}

export default AuthRequestHandler;
