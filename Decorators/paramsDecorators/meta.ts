import { RouterOptions } from "express";
import { Type } from "./middleware";


export enum ParameterType {
    REQUEST,
    RESPONSE,
    PARAMS,
    QUERY,
    BODY,
    HEADERS,
    COOKIES,
    NEXT,
    USER,
}

export interface ParameterConfiguration {
    index: number;
    type: ParameterType;
    name?: string;
    data?: Type;
}

export interface Route {
    method: string;
    url: string;
    middleware: Type[];
}

export interface ExpressMeta {
    url: string;
    routeOptions?: RouterOptions;
    routes: {
        [instanceMethodName: string]: {
            [key: string]: Route;
        }
    };
    middleware: any[];
    params: {
        [key: string]: ParameterConfiguration[];
    };
}

export interface ExpressClass {
    __express_meta__?: ExpressMeta;
}

export function getMeta(target: ExpressClass): ExpressMeta {
    if (!target.__express_meta__) {
        target.__express_meta__ = {
            url: '',
            middleware: [],
            routes: {},
            params: {}
        };
    }

    return target.__express_meta__;
}