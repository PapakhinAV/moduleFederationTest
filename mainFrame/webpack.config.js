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
            filename: 'bundle.js',
            path: path.join(__dirname, 'out'),
            assetModuleFilename: 'images/[name][ext]',
        },
        module: {
            rules: [
                {
                    test: /.jsx?$/,
                    use: ['babel-loader'],
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
                remotes: {
                    containerNameList: 'containerNameList@http://127.0.0.1:8087/List.js',
                    containerNameForm: 'containerNameForm@http://127.0.0.1:8086/AddNewForm.js'
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
        devServer: {
            port: '8085',
            hot: true,
        },
    };

    if (isProduction) {
        config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));
    }
    return config;
};
