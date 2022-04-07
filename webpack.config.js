const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    entry: {
        engine: './engine/index.ts',
        main: {
            dependOn: 'engine',
            import: './ui-implementation/index.ts',
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