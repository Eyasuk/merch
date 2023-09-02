import { Router } from 'express';
import * as auth from '../controllers/validation-rule';

const router = Router();

router.post('/register', registerHandleValidator, auth.registerHandle);

export default router;
