import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { BlogServices } from './blog.service';

const postNewBlog = asyncHandler(async (req, res) => {
  const result = await BlogServices.postNewBlogIntoDB(req.user, req.body);

  ApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blog created successfully',
    data: result,
  });
});

// Update blog content
const updateBlogUseingId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogByIdIntoDB(
    id,
    req.user,
    req.body,
  );
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

// Delete blog using id
const deleteBlogUsingId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deletedBlogFronDB(id, req.user);
  if (result?._id) {
    ApiResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Blog deleted successfully',
    });
  } else {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Blog not deleted somthing wrong',
    );
  }
});

export { deleteBlogUsingId, postNewBlog, updateBlogUseingId };
