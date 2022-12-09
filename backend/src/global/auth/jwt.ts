import 'dotenv/config';
import jwt, { Algorithm, JwtPayload } from 'jsonwebtoken';

import { JwtClaims, Role } from '../../types/auth';

class JwtProvider {
  private secretKey;
  private issuer;
  private accessExpiresIn;
  private algorithm: Algorithm;

  constructor() {
    this.secretKey = process.env.SECRET_KEY!;
    this.issuer = process.env.ISSUER!;
    this.accessExpiresIn = process.env.ACCESS_EXPIRES_IN!;
    this.algorithm = 'HS512';
  }

  generateAccessToken(sub: string, roles: Role[]) {
    return jwt.sign({ sub: sub, roles: roles }, this.secretKey, {
      issuer: this.issuer,
      expiresIn: this.accessExpiresIn,
      algorithm: this.algorithm,
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey) as JwtClaims;
  }
}

export default JwtProvider;
