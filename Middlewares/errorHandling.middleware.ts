import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.BAD_REQUEST).send({
        message: err.message,
        error: true,
        code: StatusCodes.BAD_REQUEST,
        result: null,
    });
}