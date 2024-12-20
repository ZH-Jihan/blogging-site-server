import { Router } from 'express';
import ValidateRequestData from '../../middlewares/ValidateRequestData';
import { loginUser, regesterUser } from './auth.controller';
import {
  loginValidacionSchema,
  registaionValidacionSchema,
} from './auth.validation';

const router = Router();

router
  .route('/register')
  .post(ValidateRequestData(registaionValidacionSchema), regesterUser);

router
  .route('/login')
  .post(ValidateRequestData(loginValidacionSchema), loginUser);

export const AuthRoutes = router;
