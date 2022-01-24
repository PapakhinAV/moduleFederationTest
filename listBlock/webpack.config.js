const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    const config = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'out'),
            assetModuleFilename: 'images/[name][ext]',
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-syntax-top-level-await'],
                        },
                    },
                },
                {
                    test: /.css$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    type: 'asset/resource',
                },

            ],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new CleanWebpackPlugin(),
        ],
        experiments: {
            topLevelAwait: true,
        },
        devServer: {
            port: '8087',
            hot: true,
        },
    };

    if (isProduction) {
        config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));
    }
    return config;
};