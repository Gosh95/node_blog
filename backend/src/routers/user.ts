import { Router } from 'express';

import { Routers } from '../types/layers';
import UserValidator from '../middlewares/validators/user';
import UserController from '../controllers/user/user';

class UserRouter implements Routers {
  public path;
  public router;
  private userValidator;
  private userController;

  constructor() {
    this.path = '/api/users';
    this.router = Router();
    this.userValidator = new UserValidator();
    this.userController = new UserController();

    this.initRouter();
  }

  initRouter() {
    this.router.post('/', this.userValidator.validateCreateUser(), this.userController.createUser());
  }
}

export default UserRouter;