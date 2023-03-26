import express, { Application, Handler, Request, Response, NextFunction } from "express";
import { DataSource } from "typeorm";
import { controllers } from "../Controllers";
import { appDataSource } from "../Database/db";
import { IRouter } from "../Decorators/handlers.decorator";
import { IJwtDecorator } from "../Decorators/jwt.decorator";
import { extractParamaters } from "../Decorators/paramsDecorators/express";
import { getMeta } from "../Decorators/paramsDecorators/meta";
import { MetadataKeys } from "../Meta/metadata.keys";
import { asyncError } from "../Middlewares/AsyncError.middleware";
import { CorsBypass } from "../Middlewares/CorsBypass.middleware";
import { errorHandling } from "../Middlewares/errorHandling.middleware";
import { JwtVerify } from "../Middlewares/JwtVerify.middleware";
import parseResponseMiddleware from "../Middlewares/parseResponse.middleware";
import { ValidateFields } from "../Middlewares/ValidateFields.middleware";

export class Server {

    private static Instance: Server;

    private readonly app: Application;
    private readonly port: string;
    private connection: any;
    private static db: DataSource = appDataSource;

    private constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        
        this.middlewares();
        this.routes();

        this.app.use(errorHandling);
    }

    public static get instance(): Server {
        if (!Server.Instance) {
            Server.Instance = new Server();
        }

        return Server.Instance;
    }

    public static get Db(): DataSource {
        return this.db;
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(CorsBypass);
        this.app.use(parseResponseMiddleware);
    }

    private routes() {
        const info: Array<{ api: string; handler: string }> = [];

        controllers.forEach(controllerClass => {
            const controllerInstance: { [handlerName: string]: Handler } = new controllerClass() as any;

            let basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
            const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

            const api: string = (Reflect.hasMetadata(MetadataKeys.API, controllerClass) && Reflect.getMetadata(MetadataKeys.API, controllerClass)) || null;

            if (api) {
                basePath = `${ api }${ basePath }`;
            }

            const paramsMeta = getMeta(controllerInstance);

            const exRouter = express.Router();

            routers.forEach(({ method, path, handlerName }) => {
                let middlewares: any[] = [];

                const routerHandler = (req: Request, res: Response, next: NextFunction) => {
                    const args = extractParamaters(req, res, next, paramsMeta.params[String(handlerName)]);
                    const handler: any = controllerInstance[String(handlerName)].apply(controllerInstance, args as any);

                    if (handler instanceof Promise) {
                        handler.catch(next);
                    }

                    return handler;
                };

                if (api) {
                    middlewares.push(JwtVerify);
                }

                const jwt: IJwtDecorator[] = (Reflect.hasMetadata(MetadataKeys.JWT, controllerClass) && Reflect.getMetadata(MetadataKeys.JWT, controllerClass)) || null;

                if (jwt && jwt.some(e => e.handlerName === handlerName)) {
                    middlewares.push(JwtVerify);
                }

                const validations = Reflect.hasMetadata(MetadataKeys.VALIDATE, controllerClass)
                                    ? Reflect.getMetadata(MetadataKeys.VALIDATE, controllerClass)
                                    : null;

                if (validations) {
                    Object.entries(validations).forEach(([key, value]) => {
                        if (key === handlerName) middlewares = [...middlewares, ...(<any[]>value)];
                    });
                }

                exRouter[method] (path, [...middlewares, ValidateFields], asyncError(routerHandler.bind(controllerInstance)));

                info.push({
                    api: `${ method.toLocaleUpperCase() } ${ basePath + path }`,
                    handler: `${ controllerClass.name }.${ String(handlerName) }`, 
                });

                this.app.use(basePath, exRouter);
            });
            
            console.log(info);
        })
    }

    public listen() {
        this.connection = this.app.listen(this.port, () => {
            console.log(`Server running in port ${ this.port }`)
        });
    }

    public stopServer() {
        this.connection.close(() => {
            return;
        })
    }
}