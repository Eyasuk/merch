import { body } from 'express-validator';
import colorValidator from '../../utils/mongooseColorValidator';

export const productHandleValidator = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name should not be empty')
    .isString()
    .withMessage('Name should be string'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Description should not be empty')
    .isString()
    .withMessage('Description should be string'),
  body('category', 'Category must be a string')
    .not()
    .isEmpty()
    .withMessage('Category should not be empty')
    .isString(),
  body('productInformation')
    .optional()
    .isArray()
    .withMessage('Product information should be an array'),
  body('productInformation.*.title')
    .isString()
    .withMessage('Title should be a string'),
  body('productInformation.*.description')
    .isString()
    .withMessage('Description should be a string'),
  body('price')
    .isNumeric()
    .withMessage('Price should be a number')
    .isFloat({ gt: 1 })
    .withMessage('Price should be a number greater than 1'),
  body('stock')
    .isNumeric()
    .withMessage('Stock should be a number')
    .isFloat({ gt: 1 })
    .withMessage('Stock should be a number greater than 1'),
  body('color')
    .isArray()
    .withMessage('Colors should be an array of color')
    .custom((value, { req }) => {
      const error = value.filter((items) => {
        const validColor = colorValidator(items);
        return !validColor;
      });
      if (error.length > 0) throw new Error(`Invalid Colors ${error}`);

      return true;
    })
    .optional(),
];
