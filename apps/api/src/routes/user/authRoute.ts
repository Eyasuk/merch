import { Router } from 'express';
import { checkNotAuthenticated } from '../../middleware/auth.middleware';

import {
  registerHandleValidator,
  loginHandleValidator,
} from '../../middleware/validation-rule';
import * as auth from '../../controllers/auth.controller';

const router = Router();

router.post('/login', loginHandleValidator, auth.userLoginHandle);

router.post('/check', auth.checkAuthHandle);
router.post('/register', registerHandleValidator, auth.userRegisterHandle);

router.post('/logout', auth.logout);

export default router;
