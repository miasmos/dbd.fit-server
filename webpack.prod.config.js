var webpack = require('webpack'),
    path = require('path'),
    WebpackStripLoader = require('strip-loader'),
    externals = require('webpack-node-externals');

module.exports = {
    entry: ['./app/index.js'],
    resolve: {
        alias: {
            joi: 'joi-browser'
        }
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [externals()],
    output: {
        path: __dirname + '/dist',
        filename: 'index.compiled.js'
    },
    module: {
        devtool: 'source-map', // or "inline-source-map"
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /joi-browser/],
                include: [
                    path.resolve(__dirname, 'app'),
                    path.resolve(__dirname, '../core')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
