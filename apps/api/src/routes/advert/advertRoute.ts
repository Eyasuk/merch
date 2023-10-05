import { Router } from 'express';

import {
  checkAdmin,
  checkAuthenticated,
} from '../../middleware/auth.middleware';
import {
  advertHandleValidator,
  editAdvertHandleValidator,
} from '../../middleware/validation/advertValidation';
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

router.delete(
  '/',
  checkAuthenticated,
  checkAdmin,
  editAdvertHandleValidator,
  advert.deleteAdvertHandle
);

router.put(
  '/',
  checkAuthenticated,
  checkAdmin,
  editAdvertHandleValidator,
  advert.editAdvertHandle
);

router.get('/active', advert.getActiveAdvertHandle);

export default router;
