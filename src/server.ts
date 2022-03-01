import App from '@app';
import Http from '@middlewares/http';
import express, { Application } from 'express';

class Server {
    protected app: App;
    protected express: Application;
    protected middlewareRegister: Http;

    constructor(app: App) {
        this.app = app;
        this.express = express();
    }

    static init(app: App) {
        return new this(app);
    }

    /**
     * register: Middlewares and Route register;
     */
    register(): void {
        this.middlewareRegister = Http.init(this.express);
        this.middlewareRegister.mount();
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
