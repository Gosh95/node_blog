import { Router } from 'express';

import { Routers } from '../types/layers';
import UserValidator from '../middlewares/validators/user';
import UserController from '../controllers/user/user';
import JwtAuth from '../middlewares/auth/jwt';

class UserRouter implements Routers {
  public path;
  public router;
  private userValidator;
  private userController;
  private jwtAuth;

  constructor() {
    this.path = '/api/users';
    this.router = Router();
    this.userValidator = new UserValidator();
    this.userController = new UserController();
    this.jwtAuth = new JwtAuth();

    this.initRouter();
  }

  initRouter() {
    this.router.post('/', this.userValidator.validateCreateUser(), this.userController.createUser());
    this.router.get('/me', this.jwtAuth.authenticate(), this.jwtAuth.permitUser(), this.userController.getMyPage());
    this.router.get('/:userId', this.userValidator.validateGetUserDetail(), this.userController.getUserInfo());
    this.router.patch(
      '/:userId',
      this.userValidator.validateUpdateUser(),
      this.jwtAuth.authenticate(),
      this.jwtAuth.permitUser(),
      this.userController.updateUser()
    );
    this.router.delete(
      '/:userId',
      this.userValidator.validateDeleteUser(),
      this.jwtAuth.authenticate(),
      this.jwtAuth.permitUser(),
      this.userController.deleteUser()
    );
  }
}

export default UserRouter;
