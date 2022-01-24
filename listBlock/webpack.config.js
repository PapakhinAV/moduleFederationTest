const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const deps = require('./package').dependencies;

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    const config = {
        entry: './src/index.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'out'),
            assetModuleFilename: 'images/[name][ext]',
        },
        module: {
            rules: [
                {
                    test: /.jsx?$/,
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
            new ModuleFederationPlugin({
                name: 'containerNameList',
                library: { type: 'var', name: 'containerNameList' },
                filename: 'List.js',
                exposes: {
                    // url - List/ListBlock
                    './ListBlock': './src/scripts/listBlock/ListBlock.jsx',
                },
                shared: {
                    react: {
                        requiredVersion: deps.react,
                        singleton: true,
                    },
                    'react-dom': {
                        requiredVersion: deps['react-dom'],
                        singleton: true,
                    },
                },
            }),
        ],
        experiments: {
            topLevelAwait: true,
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'out'),
            },
            port: '8087',
            hot: true,
        },
    };

    if (isProduction) {
        config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));
    }
    return config;
};
