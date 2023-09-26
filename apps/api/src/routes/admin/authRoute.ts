import { Router } from 'express';

import { loginHandleValidator } from '../../middleware/validation-rule';
import * as auth from '../../controllers/auth.controller';

const router = Router();

router.post('/login', loginHandleValidator, auth.adminLoginHandle);

router.post('/check', auth.checkAdminAuthHandle);
// router.post(
//   '/register',
//   checkNotAuthenticated,
//   registerHandleValidator,
//   auth.adminRegisterHandle
// );

router.post('/logout', auth.logout);

export default router;
