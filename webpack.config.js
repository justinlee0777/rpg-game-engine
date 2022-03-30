const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    entry: './src/index.ts',
    resolve: {
        plugins: [new TsconfigPathsPlugin({})],
        extensions: ['.ts'],
        alias: {
            characters: path.relative(__dirname, 'src/characters'),
            commands: path.relative(__dirname, 'src/commands'),
            puzzle: path.relative(__dirname, 'src/puzzle'),
        },
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