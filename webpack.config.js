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
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__filename, '../dist'),
        filename: `${name}.browser-${version}${PROD ? '.min' : ''}.js`,
        library: (name.replace(name[0], c => c.toUpperCase())).replace('js', ''),
        libraryTarget: 'umd'
    },
    plugins: plugins.concat([
        new HtmlWebpackPlugin({
            template: 'html/index.html',
            inject: 'head'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`,
                BROWSER: true
            },
        })
    ]),
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015-loose'],
                plugins: [
                    'transform-class-properties',
                    'transform-es3-member-expression-literals',
                    'transform-es3-property-literals'
                ],
                cacheDirectory: true
            }
        }]
    },
    devServer: {
        port: 8080,
        colors: true
    }
};
