import { Request, NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ResponseBuilder } from '../Helpers';

export const ValidateFields = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new ResponseBuilder(res)
                .BadRequest()
                .Json({
                    error: true,
                    code: StatusCodes.BAD_REQUEST,
                    errors: errors['errors'],
                    result: null
                });
    }

    return next();
}