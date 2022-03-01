export default interface IConfig {
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
