import { Router } from 'express';
import { registerHandleValidator } from '../middleware/validation-rule';
import * as auth from '../controllers/authController';

const router = Router();

router.post('/register', registerHandleValidator, auth.registerHandle);

export default router;
