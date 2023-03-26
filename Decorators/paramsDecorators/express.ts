import { Request, Response, NextFunction } from 'express';
import { ResponseBuilder } from '../../Helpers/ResponseBuilder';
import { ParameterConfiguration, ParameterType } from './meta';

export function extractParamaters(req: Request, res: Response, next: NextFunction, params: ParameterConfiguration[]): any[] {
    if (!params || !params.length) return [req, res, next];

    const args = [];

    for ( const { name, index, type } of params ) {
        switch(type) {
            case ParameterType.RESPONSE:
                args[index] = new ResponseBuilder(res);
                break;
            case ParameterType.REQUEST:
                args[index] = getParam(req, 'request', name!);
                break;
            case ParameterType.NEXT:
                args[index] = next;
                break;
            case ParameterType.PARAMS:
                args[index] = getParam(req, 'params', name!);
                break;
            case ParameterType.QUERY:
                args[index] = getParam(req, 'query', name!);
                break;
            case ParameterType.BODY:
                args[index] = getParam(req, 'body', name!);
                break;
            case ParameterType.HEADERS:
                args[index] = getParam(req, 'headers', name!);
                break;
            case ParameterType.COOKIES:
                args[index] = getParam(req, 'cookies', name!);
                break;
            case ParameterType.USER:
                args[index] = (req as any).user;
                break;
        }
    }

    return args;
}


type ParamType = 'params' | 'query' | 'body' | 'headers' | 'cookies' | 'request';

function getParam(source: any, paramType: ParamType, name: string): any {
    const param = source[paramType] || source;

    return name ? param[name] : param;
}