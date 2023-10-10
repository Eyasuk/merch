import { Router } from 'express';
import {
  checkAuthenticated,
  checkCreator,
} from '../../middleware/auth.middleware';
import { productHandleValidator } from '../../middleware/validation/productValidation';
import * as product from '../../controllers/product.controller';

const router = Router();

router.post(
  '/',
  checkAuthenticated,
  checkCreator,
  productHandleValidator,
  product.addProductHandle
);

export default router;
