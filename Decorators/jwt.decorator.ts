import { MetadataKeys } from "../Meta/metadata.keys";

export interface IJwtDecorator {
    handlerName: string | symbol;
}

export const Jwt = (): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        const controller = target.constructor;

        const jwt: IJwtDecorator[] = Reflect.hasMetadata(MetadataKeys.JWT, controller)
                                        ? Reflect.getMetadata(MetadataKeys.JWT, controller)
                                        : [];

        jwt.push({
            handlerName: propertyKey
        });

        Reflect.defineMetadata(MetadataKeys.JWT, jwt, controller);
    }
}