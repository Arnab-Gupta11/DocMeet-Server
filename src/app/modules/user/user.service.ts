import AppError from '../../errors/AppError';
import { IUser, TUserPayload } from './user.interface';
import { User } from './user.model';

//Create New User.
const createUserIntoDB = async (payload: TUserPayload) => {
  const { fullName, email, password, confirmedPassword, gender } = payload;
  // Check if all required fields are provided
  if (!fullName || !email || !password || !confirmedPassword || !gender) {
    throw new AppError(
      400,
      'All fields (Full Name, Email, Password, Confirmed Password, gender) are required.',
    );
  }

  // Check if password and password_confirmation match
  if (password !== confirmedPassword) {
    throw new AppError(
      400,
      'Passwords do not match. Please ensure both password fields are identical.',
    );
  }

  //Check if User is already exist
  const doesEmailExist = await User.exists({ email });
  if (doesEmailExist) {
    throw new AppError(
      409,
      'A user with this email already exists. Please try logging in or use a different email.',
    );
  }
  //generate hash password.
  const hashPassword = await User.generateHashPassword(password);

  const newUser = {
    fullName,
    email,
    password: hashPassword,
    gender,
    profileImage: `https://avatar.iran.liara.run/username?username=${fullName}&bold=false&length=1`,
  };

  const result = await User.create(newUser);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
