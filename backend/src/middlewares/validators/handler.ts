import { NextFunction } from 'express';
import { Result, ValidationError } from 'express-validator';

const handleValidationErrors = (errors: Result<ValidationError>, next: NextFunction) => {
  if (errors.isEmpty()) {
    return next();
  }
  next(errors.array());
};

export default handleValidationErrors;
