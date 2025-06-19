import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IDoctor, IVerfication } from './doctor.interface';
import { Doctor } from './doctor.model';

const verifyDoctor = async (
  payload: IVerfication & { phone: string; department: string },
  user: IUser,
) => {
  // Ensure only doctors can proceed
  if (user.role !== 'DOCTOR') {
    throw new AppError(401, 'You are not authorized as a doctor.');
  }

  const isUserExist = await User.exists({ _id: user._id });
  if (!isUserExist) {
    throw new AppError(404, 'User not found.');
  }

  const existingDoctor = await Doctor.findOne({ userId: user._id });

  // Case 1: Doctor profile exists
  if (existingDoctor) {
    const status = existingDoctor.verification?.status;

    // If already approved
    if (status === 'approved') {
      throw new AppError(409, 'Doctor verification already approved.');
    }

    // If still pending
    if (status === 'pending') {
      throw new AppError(
        409,
        'Doctor profile already submitted and is pending approval.',
      );
    }

    existingDoctor.phone = payload.phone;
    existingDoctor.department = payload.department;
    existingDoctor.verification = {
      bmdcNumber: payload.bmdcNumber,
      doctorType: payload.doctorType,
      certificateImage: payload.certificateImage,
      credentialsUrl: payload.credentialsUrl,
      nationalId: payload.nationalId,
      workplace: payload.workplace,
      status: 'pending',
      submittedAt: new Date(),
    };

    await existingDoctor.save();
    return existingDoctor;
  }
};

export const doctorServices = {
  verifyDoctor,
  
};
