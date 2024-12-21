import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  message: string;
  data?: T;
  success?: boolean;
};

const ApiResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success || true,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default ApiResponse;
