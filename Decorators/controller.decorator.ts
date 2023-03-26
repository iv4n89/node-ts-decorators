import { MetadataKeys } from "../Meta/metadata.keys"


const Controller = (basePath: string) => {
    return (target: any) => {
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    }
}

export default Controller;