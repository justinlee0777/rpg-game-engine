const path = require("path");

module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts'],
        alias: {
            characters: path.relative(__dirname, 'src/characters'),
            puzzle: path.relative(__dirname, 'src/puzzle'),
            skills: path.relative(__dirname, 'src/skills'),
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