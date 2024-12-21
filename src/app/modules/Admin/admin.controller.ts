import ApiError from '../../utils/ApiError';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { AdminServices } from './admin.service';

const blockUserByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.blockUserByAdminInDB(id);
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
