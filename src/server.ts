import App from '@app';
import { IRoute, IRouteSource } from '@interfaces/common';
import Http from '@middlewares/http';
import { autoloadRoutes, getBaseDir } from '@utils/helper';
import express, { Application, Response } from 'express';
import fs from 'fs';
import path from 'path';

class Server {
    protected app: App;
    protected express: Application;
    protected middlewareRegister: Http;
    protected routes: IRoute[] = [];

    constructor(app: App) {
        this.app = app;
        this.express = express();
        this.routes = autoloadRoutes(getBaseDir());
    }

    static init(app: App) {
        return new this(app);
    }

    /**
     * execute: Execute route;
     * @param callback
     * @returns
     */
    async execute(callback: any): Promise<any> {
        const status = 500;

        const res = this.app.get<Response>('response');

        try {
            const response = await callback;

            return response;
        } catch (e) {
            return res.status(status).json({ message: e.message });
        }
    }

    /**
     * prepareRoute: Prepare routes.
     * @param route IRoute
     */
    prepareRoute(route: IRoute): void {
        let callback: any = route.handle;

        if (typeof route.handle === 'string') {
            const [_class, method] = route.handle.trim().split('.');

            const controllers: string[] = fs.readdirSync(
                getBaseDir('/controllers'),
                { encoding: 'utf8' }
            );

            const filterControllers = controllers
                .filter((h) => /(\w+).(controller)/.test(h))
                .map((h) => h.replace(/.[^/.]+$/, ''));

            const file = `${_class}.controller`;

            if (!filterControllers.includes(file))
                throw new Error(`Controller ${_class} not found`);

            const controller = path.resolve(getBaseDir('/controllers'), file);

            // eslint-disable-next-line new-cap
            const instance = new (require(controller).default)();

            callback = instance[method];
        }

        this.express[route.method](`/api${route.path}`, (ctx: IRouteSource) => {
            this.app.add('request', () => ctx.req);
            this.app.add('response', () => ctx.res);
            this.execute(
                callback({
                    app: this.app,
                    req: ctx.req,
                    res: ctx.res,
                    next: ctx.next,
                })
            );
        });
    }

    /**
     * register: Middlewares and Route register;
     */
    register(): void {
        this.middlewareRegister = Http.init(this.express);
        this.middlewareRegister.mount();

        this.routes.forEach((route: any) => {
            route().forEach((h: any) => this.prepareRoute(h));
        });
    }

    /**
     * start: Start server and run any desirable callback.
     * @param beforeStart {() => void}
     */
    start(beforeStart?: () => void): void {
        const env = this.app.config('app.env', '');
        const host = this.app.config('app.host', '0.0.0.0');
        const port = this.app.config('app.port', 9004);

        this.register();
        this.express.listen(port, () => {
            console.log(`[${env}] Server :: Running @ http://${host}:${port}`);
            if (beforeStart) beforeStart();
        });
    }
}

export default Server;
