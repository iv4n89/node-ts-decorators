import { ExpressMeta, getMeta, ParameterType } from "./meta";


function paramDecoratorFactory(type: ParameterType) {
    return function(name?: string): ParameterDecorator {
        return function(target: any, methodName: string | symbol, index: number) {
            const meta: ExpressMeta = getMeta(target);
            if (meta.params[methodName as string] === undefined) {
                meta.params[methodName as string] = [];
            }

            meta.params[methodName as string].push({ index, type, name });
        }
    }
}


export const Req = paramDecoratorFactory(ParameterType.REQUEST);
export const Res = paramDecoratorFactory(ParameterType.RESPONSE);
export const Next = paramDecoratorFactory(ParameterType.NEXT);
export const Body = paramDecoratorFactory(ParameterType.BODY);
export const Params = paramDecoratorFactory(ParameterType.PARAMS);
export const Query = paramDecoratorFactory(ParameterType.QUERY);
export const Headers = paramDecoratorFactory(ParameterType.HEADERS);
export const Cookies = paramDecoratorFactory(ParameterType.COOKIES);
export const User = paramDecoratorFactory(ParameterType.USER);