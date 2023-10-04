import { body } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const advertHandleValidator = [
  body('name', 'Name should not be empty').not().isEmpty().isString(),
  body('alt', 'Alt should not be empty').not().isEmpty().isString(),
  body('image', 'image should not be empty').not().isEmpty(),
];

export const editAdvertHandleValidator = [
  body('id', 'Id should not be empty').not().isEmpty().isString(),
  body('id').custom((value, { req }) => {
    const validId = isValidObjectId(value);
    if (!validId) {
      throw new Error('Invalid Id');
    }
    return true;
  }),
];
