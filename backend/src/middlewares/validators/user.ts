import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import UserValidations from './validations/user';
import handleValidationErrors from './handler';

class UserValidator {
  private validations;

  constructor() {
    this.validations = new UserValidations();
  }

  validateCreateUser(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validateName().run(req);
      await this.validations.validateEmail().run(req);
      await this.validations.validatePassword().run(req);
      await this.validations.validatePasswordChecker().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }

  validateUpdateUser(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validateUserIdParams().run(req);
      await this.validations.validateName().run(req);
      await this.validations.validatePassword().run(req);
      await this.validations.validatePasswordChecker().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }

  validateUserIdParam(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validateUserIdParams().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }
}

export default UserValidator;
