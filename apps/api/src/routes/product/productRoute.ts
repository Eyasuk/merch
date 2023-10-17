import { Router } from 'express';
import {
  checkAuthenticated,
  checkCreator,
} from '../../middleware/auth.middleware';
import {
  editProductHandleValidator,
  productHandleValidator,
  productImageHandleValidator,
} from '../../middleware/validation/productValidation';
import * as product from '../../controllers/product.controller';
import upload from '../../middleware/fileUpload.middleware';

const router = Router();

router.post(
  '/',
  checkAuthenticated,
  checkCreator,
  productHandleValidator,
  product.addProductHandle
);

router.put(
  '/images',
  checkAuthenticated,
  checkCreator,
  upload.any(),
  productImageHandleValidator,
  product.addImage
);

router.get(
  '/unsaved',
  checkAuthenticated,
  checkCreator,
  product.getUnsavedProductHandle
);

router.put(
  '/',
  checkAuthenticated,
  checkCreator,
  editProductHandleValidator,
  product.editProductHandle
);

//upload.array('image', 5),

export default router;
