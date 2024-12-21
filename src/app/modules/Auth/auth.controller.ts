import httpStatus from 'http-status';
import config from '../../../config';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { AuthServices } from './auth.service';

// Register a new user into database
const regesterUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await AuthServices.regesterUserIntoDB(req.body);

  ApiResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: { _id, name, email },
  });
});

// Login user and set refresh token to cookie
const loginUser = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.loginUserInBD(
    req.body,
  );

  // Set the refresh token in Cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  // Send Access token in response to user
  ApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful',
    data: { token: accessToken },
  });
});

export { loginUser, regesterUser };
