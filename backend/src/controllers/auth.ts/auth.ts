import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import AuthMapper from './mapper';
import User from '../../models/user';
import JwtProvider from '../../global/auth/jwt';
import AuthRequestHandler from '../../types/auth';
import { SignInDto } from '../../types/dtos/auth';
import { JWT_COOKIE_NAME, JWT_COOKIE_OPTIONS } from '../../global/consts/cookie';

class AuthController {
  private authMapper;
  private jwtProvider;

  constructor() {
    this.authMapper = new AuthMapper();
    this.jwtProvider = new JwtProvider();
  }

  signIn(): RequestHandler {
    return async (req, res, next) => {
      const dto: SignInDto = { ...req.body };
      try {
        const user = await this.findUserByEmail(dto.email);
        await this.checkPasswordEquality(dto.password, user.password);

        const accessToken = this.jwtProvider.generateAccessToken(user._id.toString());
        return res
          .status(200)
          .cookie(JWT_COOKIE_NAME, accessToken, JWT_COOKIE_OPTIONS)
          .json(this.authMapper.toSignInResDto(user._id.toString(), user.email, accessToken));
      } catch (e) {
        next(e);
      }
    };
  }

  signOut(): AuthRequestHandler {
    return async (_req, res, _next) => {
      return res.clearCookie(JWT_COOKIE_NAME).redirect('/');
    };
  }

  private async findUserByEmail(email: string) {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`User not found by email. (email: ${email})`);
    }
    return user;
  }

  private async checkPasswordEquality(enteredPassword: string, userPassword: string) {
    const isEqual = await bcrypt.compare(enteredPassword, userPassword);
    if (!isEqual) {
      throw new Error('Password is not equal to entered password.');
    }
  }
}

export default AuthController;
