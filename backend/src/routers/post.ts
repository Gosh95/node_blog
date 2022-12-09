import { Router } from 'express';

import { Routers } from '../types/layers';
import PostValidator from '../middlewares/validators/post';
import PostController from '../controllers/post/post';
import JwtAuth from '../middlewares/auth/jwt';

class PostRouter implements Routers {
  public path;
  public router;
  private postValidator;
  private postController;
  private jwtAuth;

  constructor() {
    this.path = '/api/posts';
    this.router = Router();
    this.postValidator = new PostValidator();
    this.postController = new PostController();
    this.jwtAuth = new JwtAuth();

    this.initRouter();
  }

  initRouter() {
    this.router.post(
      '/',
      this.postValidator.validateCreatePost(),
      this.jwtAuth.authenticate(),
      this.postController.createPost()
    );
  }
}

export default PostRouter;
