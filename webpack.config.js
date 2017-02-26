const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const {name, version} = pkg;
const PROD = process.env.NODE_ENV === 'production';
const plugins = [];

if (PROD) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: false,
        compress: {
            warnings: false,
            screw_ie8: false,
        },
        output: {
            comments: false
        }
    }));
}

module.exports = {
    devtool: 'source-map',
    entry: {
        [`${name}.browser-${version}${PROD ? '.min' : ''}`]: './src/browser.js'
    },
    output: {
        path: path.resolve(__filename, '../dist'),
        filename: '[name].js',
        library: name,
        libraryTarget: 'umd'
    },
    plugins: plugins.concat([
        new HtmlWebpackPlugin({
            template: 'html/index.html',
            inject: 'head'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            },
        })
    ]),
    module: {
        rules: [{
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    ['es2015', {loose: true}]
                ],
                plugins: [
                    'transform-class-properties',
                    'transform-es3-member-expression-literals',
                    'transform-es3-property-literals'
                ],
                comments: false,
                cacheDirectory: true
            }
        }]
    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__filename, '../dist'),
        noInfo: true
    }
};
