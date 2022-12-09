import JwtProvider from '../../global/auth/jwt';
import AuthRequestHandler from '../../types/auth';
import { JWT_COOKIE_NAME } from '../../global/consts/cookie';
import { JwtClaims } from '../../types/auth';
import { JwtPayload } from 'jsonwebtoken';

class JwtAuth {
  private jwtProvider;

  constructor() {
    this.jwtProvider = new JwtProvider();
  }

  authenticate(): AuthRequestHandler {
    return async (req, _res, next) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies[JWT_COOKIE_NAME];
      }

      if (!token) {
        req.authUser = { userId: '', roles: ['Anonymous'] };
        return next();
      }

      try {
        const claims: JwtClaims = this.jwtProvider.verifyToken(token);
        req.authUser = { userId: claims.sub, roles: claims.roles };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export default JwtAuth;
