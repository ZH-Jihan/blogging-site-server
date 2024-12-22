import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { AdminServices } from './admin.service';

const blockUserByAdmin = asyncHandler(async (req, res) => {
  console.log(req.user);

  const { userId } = req.params;
  const result = await AdminServices.blockUserByAdminInDB(userId);

  // Check if user is blocked successfully or not
  if (result?._id) {
    ApiResponse(res, {
      statusCode: httpStatus.OK,
      message: 'User blocked successfully',
    });
  } else {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'User not blocked somthing wrong',
    );
  }
});

export { blockUserByAdmin };
