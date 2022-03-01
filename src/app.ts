import IConfig from '@interfaces/config';
import { autoloadConfig, getBaseDir } from '@utils/helper';
import { get } from 'lodash';

class App {
    private configObject: IConfig | unknown;

    constructor(base_dir: null | string = null) {
        this.configObject = base_dir ? autoloadConfig(getBaseDir()) : {};
    }

    /**
     * config: Retrieve group of environment variables or specific by key.
     * @param key string
     * @param _default any
     * @returns any
     */
    config(key?: string, _default: any = null): IConfig | any {
        if (!key) return this.configObject;

        return get(this.configObject, key, _default);
    }

    async start(server: () => void): Promise<void> {
        server();
    }
}

export default App;
