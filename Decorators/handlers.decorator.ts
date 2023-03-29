import { MetadataKeys } from "../Meta/metadata.keys";


type Methods = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface IRouter {
    method: Methods;
    path: string;
    handlerName: string | symbol;
}


const methodDecoratorFacotory = (method: Methods) => {
    return (path: string = ''): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;

            if (path === '' || path.charAt(0) !== '/') {
                path = `/${ path }`;
            }

            const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
                                        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                                        : [];
            
            routers.push({
                method,
                path,
                handlerName: propertyKey
            });

            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
        }
    }
}

export const Get = methodDecoratorFacotory('get');
export const Post = methodDecoratorFacotory('post');
export const Put = methodDecoratorFacotory('put');
export const Delete = methodDecoratorFacotory('delete');