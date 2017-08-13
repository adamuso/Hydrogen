var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'bin');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: [
        APP_DIR + '/index.tsx'
    ],
    module: {
        loaders: [
            { test : /\.tsx?$/, include : APP_DIR, exclude: "/node_modules/", loader : 'awesome-typescript-loader'  },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: 'index.js',
        library: "editor",
        libraryTarget: "commonjs"
    },
    externals: {
        'react': 'react'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: 'source-map'
};

module.exports = config;