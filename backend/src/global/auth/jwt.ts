import 'dotenv/config';
import jwt, { Algorithm } from 'jsonwebtoken';

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

  generateAccessToken(sub: string) {
    return jwt.sign({ sub: sub }, this.secretKey, {
      issuer: this.issuer,
      expiresIn: this.accessExpiresIn,
      algorithm: this.algorithm,
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }
}

export default JwtProvider;
