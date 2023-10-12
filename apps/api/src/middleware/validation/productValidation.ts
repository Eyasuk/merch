import { body, check } from 'express-validator';
import colorValidator from '../../utils/mongooseColorValidator';
import { isValidObjectId } from 'mongoose';

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
  body('colors')
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

export const productImageHandleValidator = [
  check('image').custom((value, { req }) => {
    if (!req.files || req.files.length == 0) {
      throw new Error('No image file uploaded');
    }
    if (typeof req.files.length != 'number') {
      throw new Error('Invalid file number.Import Image in individual field ');
    }
    if (req.files.length > 6) {
      throw new Error('Invalid file number. Only 5 image is allowed.');
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    for (var i = 0; i < req.files.length; i++) {
      if (!allowedTypes.includes(req.files[i].mimetype)) {
        throw new Error(
          'Invalid file type. Only JPEG and PNG images are allowed.'
        );
      }
      const maxSize = 1 * 1024 * 1024; // 3MB in bytes
      if (req.files[i].size > maxSize) {
        throw new Error('File size exceeds the maximum limit of 1MB.');
      }
    }
    return true;
  }),
  body('productId')
    .not()
    .isEmpty()
    .withMessage('ProductId should not be empty')
    .isString()
    .custom((value, { req }) => {
      const validId = isValidObjectId(value);
      if (!validId) {
        throw new Error('Invalid Id');
      }
      return true;
    }),
];
