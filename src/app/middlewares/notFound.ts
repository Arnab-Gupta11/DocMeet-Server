/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    statusCode: 404,
    error: {
      details: [
        {
          path: req.originalUrl,
          message: `The requested URL ${req.originalUrl} was not found on this server.`,
        },
      ],
    },
  });
};

export default notFound;
