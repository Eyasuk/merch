import { Router } from 'express';
import {
  checkAuthenticated,
  checkCreator,
} from '../../middleware/auth.middleware';
import {
  editProductHandleValidator,
  editProductVariationHandleValidator,
  getProductHandleValidator,
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

router.put(
  '/',
  checkAuthenticated,
  checkCreator,
  editProductHandleValidator,
  product.editProductHandle
);

router.put(
  '/variation',
  checkAuthenticated,
  checkCreator,
  upload.any(),
  editProductVariationHandleValidator,
  product.editProductVariationHandle
);

router.get(
  '/unsaved',
  checkAuthenticated,
  checkCreator,
  product.getUnsavedProductHandle
);

router.get('/', getProductHandleValidator, product.getProduct);

export default router;
