import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error.types';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid ID Format',
    errorSources,
  };
};

export default handleCastError;
