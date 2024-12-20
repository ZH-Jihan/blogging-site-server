import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { TUser, TUserModel } from './user.interface';

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordResetTime: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Check if user already axist in database
userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email: email }).select('+password');
};

// Check input password and database password are matches
userSchema.statics.isPasswordMatch = async function (
  inputPassword,
  dbPassword,
) {
  return await bcrypt.compare(inputPassword, dbPassword);
};

// Generate access token
userSchema.statics.generateAccessToken = async function (email: string) {
  const user = await User.findOne({ email: email });
  return Jwt.sign(
    {
      id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
    config.access_secret as string,
    {
      expiresIn: config.access_expires_in,
    },
  );
};

// Generate refresh token
userSchema.statics.generateRefreshToken = async function (userData) {
  return Jwt.sign(userData, config.refresh_secret as string, {
    expiresIn: config.refresh_expires_in,
  });
};

// compare passwort reset timestamp with token issue time to validate access token
userSchema.statics.checkTokenWithPasswordResetTime = async function (
  passwordResetTime,
  tokenIssue,
) {
  return passwordResetTime > tokenIssue;
};

export const User = model<TUser, TUserModel>('User', userSchema);
