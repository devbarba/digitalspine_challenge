module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { node: 'current' },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@app': './src/app',
                    '@server': './src/server',
                    '@boot': './src/boot',
                    '@configs': './src/configs',
                    '@interfaces': './src/interfaces',
                    '@middlewares': './src/middlewares',
                    '@utils': './src/utils',
                },
            },
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        'babel-plugin-transform-typescript-metadata',
    ],
    ignore: ['**/.spec.ts'],
};
