import { Router } from 'express';

import AuthValidator from '../middlewares/validators/auth';
import AuthController from '../controllers/auth/auth';
import JwtAuth from '../middlewares/auth/jwt';
import { Routers } from '../types/layers';

class AuthRouter implements Routers {
  public path;
  public router;
  private authValidator;
  private authController;
  private JwtAuth;

  constructor() {
    this.path = '/api/auth';
    this.router = Router();
    this.authValidator = new AuthValidator();
    this.authController = new AuthController();
    this.JwtAuth = new JwtAuth();

    this.initRouter();
  }

  initRouter() {
    this.router.post('/sign-in', this.authValidator.validateSignIn(), this.authController.signIn());
    this.router.post(
      '/sign-out',
      this.JwtAuth.authenticate(),
      this.JwtAuth.permitUser(),
      this.authController.signOut()
    );
  }
}

export default AuthRouter;
