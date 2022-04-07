const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    entry: {
        engine: './packages/engine/index.ts',
        main: {
            dependOn: 'engine',
            import: './packages/ui-implementation/index.ts',
        }
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({})],
        extensions: ['.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'packages/ui-implementation/index.html'),
            title: 'Game',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './packages/ui-implementation/index.css' },
            ],
        }),
    ],
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