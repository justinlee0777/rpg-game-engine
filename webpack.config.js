const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    entry: {
        engine: './engine/index.ts',
        main: './ui-implementation/index.ts',
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({})],
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
            }
        ]
    },
};

module.exports = (_, argv) => {
    if (argv.mode === 'development') {
        const override = {
            optimization: {
                minimize: false,
            },
            devtool: 'source-map',
        };

        return { ...config, ...override };
    }

    return config;
};