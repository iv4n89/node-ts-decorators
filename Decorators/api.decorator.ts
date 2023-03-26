import { MetadataKeys } from "../Meta/metadata.keys"


export const Api = (): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata(MetadataKeys.API, '/api', target);
    }
}