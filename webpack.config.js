const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
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
    optimization: {
        minimize: false,
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