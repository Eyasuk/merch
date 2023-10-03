import { body } from 'express-validator';

export const advertHandleValidator = [
  body('name', 'Name should not be empty').not().isEmpty().isString(),
  body('alt', 'Alt should not be empty').not().isEmpty().isString(),
  body('image', 'image should not be empty').not().isEmpty(),
];
