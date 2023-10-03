import { Router } from 'express';

import {
  checkAdmin,
  checkAuthenticated,
} from '../../middleware/auth.middleware';
import { advertHandleValidator } from '../../middleware/validation/advertValidation';
import * as advert from '../../controllers/advert.controller';

const router = Router();

router.post(
  '/',
  checkAuthenticated,
  checkAdmin,
  advertHandleValidator,
  advert.addAdvertHandle
);

router.get('/', checkAuthenticated, checkAdmin, advert.getAdvertHandle);

// router.post(
//   '/register',
//   checkNotAuthenticated,
//   registerHandleValidator,
//   auth.adminRegisterHandle
// );

router.delete('/');
router.put('/');

export default router;
