import { Router } from 'express';
import auth from '../../middlewares/auth';
import ValidateRequestData from '../../middlewares/ValidateRequestData';
import { postNewBlog, updateBlogUseingId } from './blog.controller';
import { BlogValidationSchema } from './blog.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(),
    ValidateRequestData(BlogValidationSchema.postBlogValidationSchema),
    postNewBlog,
  );

router
  .route('/:id')
  .patch(
    auth(),
    ValidateRequestData(BlogValidationSchema.updateBlogValidationSchema),
    updateBlogUseingId,
  );

export const BlogRoutes = router;
