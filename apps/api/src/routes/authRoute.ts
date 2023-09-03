import { Router } from 'express';
import passport from 'passport';
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from '../middleware/auth.middleware';

import {
  registerHandleValidator,
  loginHandleValidator,
} from '../middleware/validation-rule';
import * as auth from '../controllers/auth.controller';

const router = Router();

router.post(
  '/login',
  checkNotAuthenticated,
  loginHandleValidator,
  auth.loginHandle,
  passport.authenticate('local', {
    successRedirect: '/api1',
    failureRedirect: '/api',
    failureFlash: true,
  })
);

router.post('/register', registerHandleValidator, auth.registerHandle);
export default router;
