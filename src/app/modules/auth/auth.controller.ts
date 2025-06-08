import { Request, Response } from 'express';
import { authServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
//Login controller.
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authServices.LoginUser(email, password);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
});

export const authControllers = {
  loginUser,
};
