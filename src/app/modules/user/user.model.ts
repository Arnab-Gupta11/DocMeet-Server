import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
// Common User Schema for both Recruiters and Job Seekers
const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['UNASSIGNED', 'PATIENT', 'DOCTOR', 'ADMIN'],
      default: 'UNASSIGNED',
    },
  },
  { timestamps: true },
);

//static methods.
//check if password matched.
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
//Generate hash password.
userSchema.statics.generateHashPassword = async function (password) {
  const salt = await bcrypt.genSalt(Number(config.jwt.bcrypt_salt_rounds));
  const newHashPassword = await bcrypt.hash(password, salt);
  return newHashPassword;
};
export const User = mongoose.model<IUser, UserModel>('User', userSchema);
