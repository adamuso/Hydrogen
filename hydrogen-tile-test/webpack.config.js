/**
 * Created by adame on 29.07.2017.
 */

var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');

var SingleModuleInstancePlugin = require('single-module-instance-webpack-plugin');
var DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

var config = {
    entry: [
        'babel-polyfill',
        APP_DIR + '/index.ts'
    ],
    module: {
        loaders: [
            { test : /\.tsx?$/, include : APP_DIR, exclude: "/node_modules/", loader : 'ts-loader' },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static/index.html' },
            { from: 'static/assets', to: 'assets' }
        ]),
        new SingleModuleInstancePlugin(),
        DuplicatePackageCheckerPlugin
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './src')
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "oxygen-core": path.join(__dirname, "node_modules", "oxygen-core"),
            "gl-matrix": path.join(__dirname, "node_modules", "gl-matrix")
        }
    },
    devtool: 'inline-source-map'
};

module.exports = config;