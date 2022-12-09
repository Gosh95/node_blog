import { Request, Response, NextFunction, RequestHandler } from 'express';

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
