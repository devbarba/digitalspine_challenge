import { IConfig, IRoute } from '@interfaces/common';
import fs from 'fs';
import path from 'path';

/**
 * autoloadConfig: Auto load configurations.
 * @param base_dir string
 * @returns IConfig
 */
const autoloadConfig = (base_dir: string): IConfig => {
    const configDir = path.join(base_dir, 'configs');

    if (!fs.existsSync(configDir)) throw 'directory config not exists';

    const configs = fs.readdirSync(configDir);

    const data: any = {};

    configs.forEach((file) => {
        const filename = path.join(configDir, file);
        data[file.split('.')[0]] = require(filename).default;
    });

    return data;
};

/**
 * getDir: Get passed dir.
 * @param folder string
 * @returns string
 */
const getDir = (folder = ''): string => path.resolve(__dirname, '../', folder);

/**
 * baseDir: Get the base dir.
 * @param folder string
 * @returns string
 */
const getBaseDir = (folder = ''): string => getDir(folder ? `${folder}` : '');

/**
 * getEnv: Get passed env.
 * @param key
 * @param alternate
 * @returns
 */
const getEnv = (
    key: string,
    alternate: any,
    required?: boolean
): string | undefined => {
    if (
        required &&
        process.env[key] === undefined &&
        process.env[alternate] === undefined
    )
        throw `missing key: ${key}`;

    if (process.env[key] && process.env[key] !== 'null')
        return process.env[key];

    if (process.env[alternate] && process.env[alternate] !== 'null')
        return process.env[alternate];

    return alternate;
};

/**
 * autoloadRoutes: Auto load the api routes.
 * @param base_dir string
 * @returns all routes
 */
const autoloadRoutes = (base_dir: string): IRoute[] => {
    const routeDir = path.join(base_dir, 'routes');

    if (!fs.existsSync(routeDir)) throw 'route directory not exists';

    const dir = fs.readdirSync(routeDir);
    const routes: any[] = [];

    dir.forEach((file) => {
        const filename = path.join(routeDir, file);
        const value = require(filename).default;
        routes.push(value);
    });

    return routes;
};

export { autoloadConfig, getDir, getBaseDir, getEnv, autoloadRoutes };
