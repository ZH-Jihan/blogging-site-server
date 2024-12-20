import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError';
import { User } from '../User/user.model';
import { TLogin, TRegestaion } from './auth.interface';

const regesterUserIntoDB = async (payload: TRegestaion) => {
  const user = await User.isUserExists(payload.email);

  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists');
  }

  const newUser = await User.create(payload);
  return newUser;
};

// Log In User
const loginUserInBD = async (payload: TLogin) => {
  const user = await User.isUserExists(payload.email);

  // Check if user does not exist
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // Check if user is blocked
  if (user.isBlocked === true) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Check if password is correct
  if (!(await User.isPasswordMatch(payload.password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Create Access Token and Refresh Token
  const jwtPayload = {
    email: user.email,
    role: user.role,
    name: user.name,
  };
  const accessToken = await User.generateAccessToken(jwtPayload);
  const refreshToken = await User.generateRefreshToken(jwtPayload);

  return { accessToken, refreshToken };
};

export const AuthServices = {
  regesterUserIntoDB,
  loginUserInBD,
};
