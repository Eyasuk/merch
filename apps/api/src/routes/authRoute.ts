import { Router } from 'express';
import {
  checkAuth,
  checkAuthenticated,
  checkNotAuthenticated,
} from '../middleware/auth.middleware';

import {
  registerHandleValidator,
  loginHandleValidator,
} from '../middleware/validation-rule';
import * as auth from '../controllers/auth.controller';

const authRouter = (passport) => {
  const router = Router();

  router.post(
    '/login',
    checkNotAuthenticated,
    loginHandleValidator,
    auth.loginHandle
  );

  router.post('/check', checkAuth);
  router.post(
    '/register',
    checkNotAuthenticated,
    registerHandleValidator,
    auth.registerHandle
  );

  return router;
};

export default authRouter;
