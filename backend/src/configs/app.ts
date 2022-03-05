import { getEnv } from '@utils/helper';

export default {
    env: getEnv('NODE_EV', 'development'),
    host: getEnv('APP_HOST', '0.0.0.0'),
    port: getEnv('APP_PORT', 9004),
    timezone: getEnv('TZ', 'Europe/Berlin'),
    jwt: {
        secret: getEnv('JWT_SECRET', '', true),
        ttl: getEnv('JWT_TTL', '', true),
    },
    redis: {
        host: getEnv('REDIS_HOST', '', true),
        port: getEnv('REDIS_PORT', '', true),
        pass: getEnv('REDIS_PASS', '', true),
    },
    database: {
        host: getEnv('POSTGRES_HOST', '', true),
        port: getEnv('POSTGRES_PORT', '', true),
        name: getEnv('POSTGRES_DB', '', true),
        user: getEnv('POSTGRES_USER', '', true),
        pass: getEnv('POSTGRES_PASSWORD', '', true),
    },
};
