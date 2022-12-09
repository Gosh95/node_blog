import { CookieOptions } from 'express';

export const JWT_COOKIE_NAME = 'jwt';

export const JWT_COOKIE_OPTIONS: CookieOptions = {
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
  path: '/',
};
