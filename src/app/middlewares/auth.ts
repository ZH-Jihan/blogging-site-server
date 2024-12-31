import httpStatus from 'http-status';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/asyncHandaler';

const auth = (...roles: TUserRole[]) => {
  return asyncHandler(async (req, res, next) => {
    const token = req?.headers?.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.replace('Bearer ', '').trim()
      : null;

    // Check token is present in the request
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid User');
    }

    // Check token is valid or not
    const decodedData = Jwt.verify(
      token,
      config.access_secret as string,
    ) as JwtPayload;

    // Destrating the decoded data
    const { exp, email, role, iat } = decodedData;

    // Check token is expired or not
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > (exp as number)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Your Session has expired please login again',
      );
    }

    // find user from database with email
    const user = await User.isUserExists(email);

    // check token validity with password reset time
    const issueTime = user?.passwordResetTime
      ? user.passwordResetTime.getTime() / 1000
      : 0;
    const isTokenValid = await User.checkTokenWithPasswordResetTime(
      issueTime,
      iat as number,
    );
    if (user?.passwordResetTime && isTokenValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    // Check the user is exist or not in database
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
    }

    // Check if user is blocked
    if (user.isBlocked === true) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    // Check user role is valid or not to access the route
    if (roles.length && !roles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not allowed to access this route',
      );
    }

    req.user = decodedData;
    next();
  });
};

export default auth;
