import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import { Application } from 'express';

class Http {
    protected express: Application;

    constructor(express: Application) {
        this.express = express;
    }

    static init(express: Application) {
        return new this(express);
    }

    mount(): Application {
        this.express.use(cors());
        this.express.disable('x-powered-by');
        this.express.use(compress());
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        return this.express;
    }
}

export default Http;
