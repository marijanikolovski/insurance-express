import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateDiscount = [
  body('name').notEmpty().withMessage('Discount name is required'),
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
  body('description').notEmpty().withMessage('Discount description is required'),

];

export default validateDiscount;