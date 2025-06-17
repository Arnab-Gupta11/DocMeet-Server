/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

// Interface for User Schema
export interface IUser extends Document {
  _id: ObjectId;
  fullName: string;
  email: string;
  password: string;
  profileImage: string;
  gender: 'male' | 'female' | 'other';
  isBlocked: boolean;
  isVerified?: boolean;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserPayload = Pick<
  IUser,
  'fullName' | 'email' | 'password' | 'gender' | 'role'
> & { confirmedPassword: string };

export type TEmailVerification = {
  userId: ObjectId;
  otp: string;
  createdAt: Date;
};

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  generateHashPassword(password: string): Promise<string>;
}

export type TUserRole = keyof typeof USER_ROLE;
