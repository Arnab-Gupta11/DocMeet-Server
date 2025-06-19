import { Request, Response } from 'express';
import { doctorServices } from './doctor.service';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const verifyDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.verifyDoctor(req.body, req.user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Doctor verification submitted successfully. Awaiting approval.',
    data: result,
  });
});

export const doctorControllers = {
  verifyDoctor,

};
