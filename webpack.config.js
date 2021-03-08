const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        'index': './src/Index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'tmp')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8081,

        proxy: {
            '/proxyAPI/api/V1': {
                target: 'http://10.222.8.180:8102',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxyAPI': ''
                }
            },
        }
    }
};