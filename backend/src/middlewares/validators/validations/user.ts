import { body, ValidationChain, param } from 'express-validator';
import { isObjectIdOrHexString } from 'mongoose';

import { NAME_REGEX, PASSWORD_REGEX } from '../../../global/consts/regex';

class UserValidations {
  constructor() {}

  validateName(): ValidationChain {
    return body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is empty.')
      .bail()
      .isLength({ min: 1, max: 16 })
      .withMessage('Name must be between 1 and 16 characters.')
      .matches(NAME_REGEX)
      .withMessage('Name must be korean or english.');
  }

  validateEmail(): ValidationChain {
    return body('email')
      .trim()
      .isEmail()
      .withMessage('Email format is invalid.')
      .bail()
      .isLength({ min: 4, max: 50 })
      .withMessage('Email must be between 4 and 50 characters.');
  }

  validatePassword(): ValidationChain {
    return body('password')
      .matches(PASSWORD_REGEX)
      .withMessage('Password must contain at least one number, one lower, one upper, one special.')
      .isLength({ min: 8, max: 50 })
      .withMessage('Password must be between 8 and 50 characters.');
  }

  validatePasswordChecker(): ValidationChain {
    return body('passwordChecker')
      .custom((value, { req }) => {
        if (value === req.body.password) {
          return true;
        }
      })
      .withMessage('Password checker is not equal to password.');
  }

  validateUserIdParams(): ValidationChain {
    return param('userId')
      .custom((value, { req }) => {
        if (isObjectIdOrHexString(value)) {
          return true;
        }
      })
      .withMessage('Userid param is not object id type.');
  }

  validateEmptyPassword(): ValidationChain {
    return body('password').notEmpty().withMessage('Password is empty.');
  }
}

export default UserValidations;
