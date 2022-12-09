import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type Role = 'Anonymous' | 'User' | 'Admin';

export interface JwtClaims extends JwtPayload {
  sub: string;
  roles: Role[];
  iss: string;
  iat: number;
  exp: number;
}

interface AuthUser {
  userId: string | null;
  roles: Role[];
}

interface AuthRequest extends Request {
  authUser?: AuthUser;
}

interface AuthRequestHandler {
  (req: AuthRequest, res: Response, next: NextFunction): void;
}

export default AuthRequestHandler;
