import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

import UserValidations from './validations/user';
import handleValidationErrors from './handler';

class AuthValidator {
  private validations;

  constructor() {
    this.validations = new UserValidations();
  }

  validateSignIn(): RequestHandler {
    return async (req, _res, next) => {
      await this.validations.validateEmptyEmail().run(req);
      await this.validations.validateEmptyPassword().run(req);

      const errors = validationResult(req);
      handleValidationErrors(errors, next);
    };
  }
}

export default AuthValidator;
