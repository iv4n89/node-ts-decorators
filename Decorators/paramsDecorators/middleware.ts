import { Request, Response, NextFunction } from 'express';


export interface Type extends Function {
    new (...args: any[]): any;
}

export interface Middleware {
    use(request: Request, response: Response, next: NextFunction): void;
}

export interface ErrorMiddleware {
    use(error: any, request: Request, response: Response, next: NextFunction): void;
}