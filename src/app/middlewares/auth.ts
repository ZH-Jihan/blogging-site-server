import { TUserRole } from '../modules/User/user.interface';
import asyncHandler from '../utils/asyncHandaler';

const auth = (...rols: TUserRole[]) => {
  return asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
  });
};
