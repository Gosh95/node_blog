import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import PostValidations from './validations/post';
import handleValidationErrors from './handler';

class PostValidator {
  private validations;

  constructor() {
    this.validations = new PostValidations();
  }

  validateCreatePost(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validateTitle().run(req);
      await this.validations.validateContents().run(req);
      await this.validations.validateIsPrivate().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }

  validateGetPostDetail(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validatePostIdParams().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }

  validateUpdatePost(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validateTitle().run(req);
      await this.validations.validateContents().run(req);
      await this.validations.validateIsPrivate().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }

  validateDeletePost(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validatePostIdParams().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }
}

export default PostValidator;
