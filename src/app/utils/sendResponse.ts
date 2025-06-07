import { Response } from 'express';
export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, response: TResponse<T>) => {
  res.status(response.statusCode).json({
    success: response.success,
    statuscode: response.statusCode,
    message: response.message,
    data: response.data,
  });
};
