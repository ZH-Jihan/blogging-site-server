import { Router } from 'express';
import auth from '../../middlewares/auth';
import { deleteBlogUsingId } from '../Blog/blog.controller';
import { blockUserByAdmin } from './admin.controller';

const router = Router();

router.route('/users/:userId/block').patch(auth('admin'), blockUserByAdmin);

router.route('/blogs/:id').delete(auth('admin'), deleteBlogUsingId);

export const AdminRoutes = router;
