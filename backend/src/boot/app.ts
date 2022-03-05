import App from '@app';
import path from 'path';

let instance: App | null = null;

const Application = (): App => {
    if (!instance) instance = new App(path.join(process.cwd(), ''));

    return instance;
};

export default Application();
