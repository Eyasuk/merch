import { body, check } from 'express-validator';

export const registerHandleValidator = [
  body('email').custom((value, { req }) => {
    if (!value && !req.body.phone) {
      throw new Error('Either email or phone must be provided');
    }
    return true;
  }),
  body('email', 'Invalid email').isEmail().optional().isString(),
  body('phone').custom((value, { req }) => {
    if (!value && !req.body.email) {
      throw new Error('Either email or phone must be provided');
    }
    return true;
  }),
  body('phone', 'Invalid Phone number')
    .matches(/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .optional()
    .isString(),
  body('password', 'The minimum password length is 6 characters').isLength({
    min: 6,
  }),
  body('first_name', 'First Name should not be empty')
    .not()
    .isEmpty()
    .isString(),
];

export const loginHandleValidator = [
  body('email').custom((value, { req }) => {
    if (!value && !req.body.phone) {
      throw new Error('Either email or phone must be provided');
    }
    return true;
  }),
  body('email', 'Invalid email').isEmail().optional().isString(),
  body('phone').custom((value, { req }) => {
    if (!value && !req.body.email) {
      throw new Error('Either email or phone must be provided');
    }
    return true;
  }),
  body('phone', 'Invalid Phone number')
    .matches(/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    .optional()
    .isString(),
];

export const SUDOOptionalUserAccessLevel = [
  check(
    'accessLevels',
    'accessLevels must be an array containing either admin, user, moderator, or creator'
  )
    .optional()
    .isArray()
    .custom((value, { req }) => {
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (
            value[i] !== 'admin' &&
            value[i] !== 'user' &&
            value[i] !== 'moderator' &&
            value[i] !== 'creator'
          ) {
            throw new Error(
              'accessLevels must be an array containing either admin, user, moderator, or creator'
            );
          }
        }
      }
      return true;
    }),
];
