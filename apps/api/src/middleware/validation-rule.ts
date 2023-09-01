import { body } from 'express-validator';

export const registerHandleValidator = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({
    min: 6,
  }),
  body('phone', 'Phone number should not be empty').not().isEmpty(),
  body('phone', 'Invalid Phone number').isMobilePhone('any'),
  body('first_name', 'First Name should not be empty').not().isEmpty(),
];
