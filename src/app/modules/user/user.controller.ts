import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

//Create User.
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createUserIntoDB(req.body);
  if (result) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registration successful. Welcome aboard!',
      data: result,
    });
  }
});

//Verify User Email.
const verifyUserEmail = catchAsync(async (req: Request, res: Response) => {
  const { otp } = req.body;
  const { id } = req.params;
  const result = await userServices.verifyUserEmailInDB(id, otp);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Email verified successfully.',
      data: {},
    });
});

export const userControllers = {
  createUser,
  verifyUserEmail
};
