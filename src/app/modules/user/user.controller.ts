import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

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

export const userControllers = {
  createUser,
};
