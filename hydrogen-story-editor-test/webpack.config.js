var webpack = require('webpack');
var path = require('path');
var process = require('process');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var NitrogenWebpackPlugin = require('nitrogen-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');
var EDITOR = !!process.env.NITROGEN_EDITOR;

var config = {
    entry: [
        'babel-polyfill',
        APP_DIR + '/index.ts'
    ],
    module: {
        loaders: [
            { test : /\.tsx?$/, include : APP_DIR, exclude: "/node_modules/", loader : 'ts-loader'  },
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
        ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    externals: {
        'react': 'react',
        'material-ui': 'material-ui',
        'material-ui/styles': 'material-ui/styles',
        'material-ui/svg-icons': 'material-ui/svg-icons'
    },
    devtool: 'source-map'
};

if (!!EDITOR) {
    config.plugins.push(new NitrogenWebpackPlugin({
        config,
        root: __dirname
    }));
}

module.exports = config;