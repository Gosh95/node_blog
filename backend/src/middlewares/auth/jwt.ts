import JwtProvider from '../../global/auth/jwt';
import AuthRequestHandler from '../../types/auth';
import { JWT_COOKIE_NAME } from '../../global/consts/cookie';
import { JwtClaims } from '../../types/auth';

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
        req.authUser = { userId: null, roles: ['Anonymous'] };
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

  permitUser(): AuthRequestHandler {
    return async (req, _res, next) => {
      try {
        const authUser = { ...req.authUser! };
        if (!authUser.roles.includes('User') && !authUser.roles.includes('Admin')) {
          throw new Error('User permission is required.');
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  permitAdmin(): AuthRequestHandler {
    return async (req, _res, next) => {
      try {
        const authUser = { ...req.authUser! };
        if (!authUser.roles.includes('Admin')) {
          throw new Error('Admin permission is required.');
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export default JwtAuth;
