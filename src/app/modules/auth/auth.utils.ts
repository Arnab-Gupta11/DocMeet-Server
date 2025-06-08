import jwt from 'jsonwebtoken';
import config from '../../config';
import { IUser } from '../user/user.interface';

export const createAccessToken = (user: IUser) => {
  const payload = {
    _id: user._id,
    role: user.role,
  };
  const secret = config.jwt.jwt_access_token_secret_key as string;
  const expiresIn = '3d';
  return jwt.sign(payload, secret, { expiresIn });
};
export const createRefreshToken = (user: IUser) => {
  const payload = {
    _id: user._id,
    role: user.role,
  };
  const secret = config.jwt.jwt_refresh_token_secret_key as string;
  const expiresIn = '365d';
  return jwt.sign(payload, secret, { expiresIn });
};
export const createPasswordResetToken = (user: IUser) => {
  const payload = {
    _id: user._id,
  };
  const secret = config.jwt.jwt_password_reset_token_secret_key as string;
  const expiresIn = '15m';
  return jwt.sign(payload, secret, { expiresIn });
};
