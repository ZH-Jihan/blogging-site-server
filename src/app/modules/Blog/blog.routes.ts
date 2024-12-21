import { Router } from 'express';
import auth from '../../middlewares/auth';
import ValidateRequestData from '../../middlewares/ValidateRequestData';
import {
  deleteBlogUsingId,
  getAllBlog,
  postNewBlog,
  updateBlogUseingId,
} from './blog.controller';
import { BlogValidationSchema } from './blog.validation';

const router = Router();

// this route is used to post new blog and get all blog
router
  .route('/')
  .post(
    auth(),
    ValidateRequestData(BlogValidationSchema.postBlogValidationSchema),
    postNewBlog,
  )
  .get(getAllBlog);

// this route is used to update and delete blog using id
router
  .route('/:id')
  .patch(
    auth(),
    ValidateRequestData(BlogValidationSchema.updateBlogValidationSchema),
    updateBlogUseingId,
  )
  .delete(auth('user'), deleteBlogUsingId);

export const BlogRoutes = router;
