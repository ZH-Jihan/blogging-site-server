import { Model } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  passwordResetTime?: Date;
  isBlocked: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatch(inputPassword: string, dbPassword: string): Promise<boolean>;
  generateAccessToken(userData: object): Promise<string>;
  generateRefreshToken(userData: object): Promise<string>;
  checkTokenWithPasswordResetTime(
    passwordResetTime: number,
    tokenIssue: number,
  ): Promise<boolean>;
}
