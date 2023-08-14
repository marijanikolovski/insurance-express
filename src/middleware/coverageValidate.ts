import { body } from 'express-validator';

const validateCoverage = [
  body('name').notEmpty().withMessage('Coverage name is required'),
  body('value')
    .isInt({ min: 0 })
    .withMessage('Value must be a positive integer'),
  body('value_user_over30')
    .isInt({ min: 0 })
    .withMessage('Value must be a positive integer'),
  body('description').notEmpty().withMessage('Coverage description is required'),

];

export default validateCoverage;