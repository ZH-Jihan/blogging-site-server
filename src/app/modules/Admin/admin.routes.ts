import { Router } from 'express';
import auth from '../../middlewares/auth';
import { deleteBlogUsingId } from '../Blog/blog.controller';
import { blockUserByAdmin } from './admin.controller';

const router = Router();

// This route is responsible for blocking user by admin
router.route('/users/:userId/block').patch(auth('admin'), blockUserByAdmin);

// This route is responsible for deleting any blog by admin
router.route('/blogs/:id').delete(auth('admin'), deleteBlogUsingId);

export const AdminRoutes = router;
