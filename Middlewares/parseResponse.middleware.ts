import { Request, Response } from 'express';
import mung from 'express-mung';

function parseResponse(body: any, req: Request, res: Response) {
    if (body.error) return;
    if (res.statusCode >= 400) return;

    return {
        error: false,
        code: res.statusCode,
        result: body,
    };
}


export default mung.json(parseResponse);