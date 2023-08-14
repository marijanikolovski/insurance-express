import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateAge = [
  body('age').notEmpty().withMessage('Age is required'),
  body('value')
    .isInt({ min: 0 })
    .withMessage('Value must be a positive integer'),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

export default validateAge;