import App from '@app';
import { Request, Response } from 'express';

interface IConfig {
    app: {
        env: 'development' | 'staging' | 'production';
        host: string;
        port: number;
        timezone: string;
        jwt: {
            secret: string;
            ttl: string;
        };
        redis: {
            host: string;
            port: string;
            pass: string;
        };
        database: {
            host: string;
            port: string;
            user: string;
            pass: string;
            name: string;
        };
    };
}

enum RouteMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    ALL = 'all',
}

interface IRouteSource {
    req: Request;
    res: Response;
    app: App;
    next: CallableFunction;
}

interface IRoute {
    path: string;
    method: RouteMethods;
    handle: { (context: IRouteSource): any } | string;
    middleware?: string | string[];
}

interface IService {
    constructor(app: App): any;
    init(): Promise<any>;
}

export { IConfig, IRouteSource, RouteMethods, IRoute, IService };
