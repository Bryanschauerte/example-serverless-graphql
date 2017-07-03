var path = require('path');
var nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: './src/graphqlHandler.js',
    target: 'node',

    externals: [nodeExternals()],

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: __dirname,
            exclude: /node_modules/
        }]
    },

    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'graphqlHandler.js'
    }
};
