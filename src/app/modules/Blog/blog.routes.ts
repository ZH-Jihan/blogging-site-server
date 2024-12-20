import { Router } from 'express';
import auth from '../../middlewares/auth';

const router = Router();

router.route('/').post(auth());

export const BlogRoutes = router;
