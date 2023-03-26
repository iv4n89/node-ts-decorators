import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ResponseBuilder } from '../Helpers/ResponseBuilder';

export const JwtVerify = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    const response = new ResponseBuilder(res);

    if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
        return response.Unauthorized().build();
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET! as string, (err, user) => {
        if (err) {
            console.log(err);
            return response.Forbidden().build();
        }
        (req as any).user = user;

        next();
    });
}