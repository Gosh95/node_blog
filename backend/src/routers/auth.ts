import { Router } from 'express';

import { Routers } from '../types/layers';
import AuthValidator from '../middlewares/validators/auth';
import AuthController from '../controllers/auth/auth';

class AuthRouter implements Routers {
  public path;
  public router;
  private authValidator;
  private authController;

  constructor() {
    this.path = '/api/auth';
    this.router = Router();
    this.authValidator = new AuthValidator();
    this.authController = new AuthController();

    this.initRouter();
  }

  initRouter() {
    this.router.post('/sign-in', this.authValidator.validateSignIn(), this.authController.signIn());
    this.router.post('/sign-out', this.authController.signOut());
  }
}

export default AuthRouter;
