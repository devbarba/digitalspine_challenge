import { IConfig, IService } from '@interfaces/common';
import { autoloadConfig, getBaseDir } from '@utils/helper';
import _, { get } from 'lodash';

class App {
    private configObject: IConfig | unknown;
    public services: { [key: string]: ThisType<unknown> }[] = [];

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

    /**
     * has: Verify if service exists.
     * @param service string
     * @returns boolean
     */
    has(service: string): boolean {
        return _.keys(this.services).includes(service);
    }

    /**
     * get: Get a service.
     * @param service string
     * @returns T
     */
    get<T = any>(service: string, exception = false): T {
        if (!this.has(service) && exception)
            throw `service ${service} not initialized`;

        return this.services[service];
    }

    /**
     * add: Add a service.
     * @param name string
     * @param concrete Function | IService
     */
    add(name: string, concrete: () => void | IService | unknown): App {
        this.services[name] = concrete;

        return this;
    }

    async start(server: () => void): Promise<void> {
        server();
    }
}

export default App;
