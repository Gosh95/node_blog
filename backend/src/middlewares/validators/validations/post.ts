import { body, ValidationChain } from 'express-validator';

class PostValidations {
  constructor() {}

  validateTitle(): ValidationChain {
    return body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is empty.')
      .bail()
      .isLength({ min: 4, max: 30 })
      .withMessage('Title must be between 4 and 30 characters.');
  }

  validateContents(): ValidationChain {
    return body('contents')
      .trim()
      .notEmpty()
      .withMessage('Contents is empty.')
      .bail()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Contents must be between 10 and 1000 characters.');
  }

  validateIsPrivate(): ValidationChain {
    return body('isPrivate')
      .notEmpty()
      .withMessage('IsPrivate is empty.')
      .bail()
      .isBoolean()
      .withMessage('IsPrivate must be boolean type.');
  }
}

export default PostValidations;
