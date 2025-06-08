import AppError from '../../errors/AppError';
import { EmailVerificationModel } from './emailVerification.model';
import { IUser, TUserPayload } from './user.interface';
import { User } from './user.model';
import { sendEmailVerificationOTP } from './user.utils';

/* ---------> Create new user. <----------- */
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
  if (result) {
    //Send Verification Email.
    sendEmailVerificationOTP(result);
  }
  return result;
};

/* ---------> User Email Verification. <----------- */
const verifyUserEmailInDB = async (id: string, otp: string) => {
  // Check if all required fields are provided
  if (!otp) {
    throw new AppError(400, 'OTP is required.');
  }

  // Fetch user details using the provided email
  const existingUser = await User.findById(id);

  // Check if email does not exist in the database
  if (!existingUser) {
    throw new AppError(404, 'No user found please register with new email.');
  }

  // Verify if the email is already verified.
  if (existingUser.isVerified) {
    throw new AppError(400, 'Email is already verified.');
  }

  // Fetch the email verification record matching the user and OTP.
  const emailVerification = await EmailVerificationModel.findOne({
    userId: existingUser._id,
    otp,
  });

  // Handle invalid OTP
  if (!emailVerification) {
    if (!existingUser.isVerified) {
      // Resend a new OTP if the email is not verified.
      await sendEmailVerificationOTP(existingUser);
      throw new AppError(
        422,
        'Invalid OTP. A new OTP has been sent to your email.',
      );
    }
    throw new AppError(422, 'Invalid OTP.');
  }

  // Check if the OTP has expired.
  const currentTime = new Date();
  const expireationTime = new Date(
    emailVerification.createdAt.getTime() + 15 * 60 * 1000,
  );
  if (currentTime > expireationTime) {
    // Resend a new OTP if the previous one has expired
    await sendEmailVerificationOTP(existingUser);
    throw new AppError(
      422,
      'OTP has expired. A new OTP has been sent to your email.',
    );
  }
  // Mark the user's email as verified
  existingUser.isVerified = true;
  await existingUser.save();

  // Delete all email verification records for this user.
  await EmailVerificationModel.deleteMany({ userId: existingUser._id });

  return true;
};

export const userServices = {
  createUserIntoDB,
  verifyUserEmailInDB,
};
