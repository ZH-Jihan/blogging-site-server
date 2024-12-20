import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import asyncHandler from '../utils/asyncHandaler';

const ValidateRequestData = (schema: AnyZodObject) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // validation check
      //if everything allright next() ->
      await schema.parseAsync(req.body, req.cookies);

      next();
    },
  );
};

export default ValidateRequestData;
