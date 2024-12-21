import { User } from '../User/user.model';

const blockUserByAdminInDB = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return user;
};

export const AdminServices = {
  blockUserByAdminInDB,
};
