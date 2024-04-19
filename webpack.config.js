const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
const FileManagerPlugin = require('filemanager-webpack-plugin')
const PugPlugin = require('pug-plugin')


module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new PugPlugin({
            entry: {
                // Insert your PUG templates here
                index: 'index.pug',
            },
            js: {
                filename: 'assets/js/[name].[contenthash:8].js'
            },
            css: {
                filename: 'assets/css/[name].[contenthash:8].css'
            },
            verbose: 'auto', // output to console the information about the processing
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/assets/img/',
                    to: './assets/img/',
                    noErrorOnMissing: true,
                },
                {
                    from: './src/assets/js/',
                    to: './assets/js/',
                    noErrorOnMissing: true,
                },
                {
                    from: './src/favicon.ico',
                    to: '',
                },
                {
                    from: './src/assets/img/',
                    to: './assets/img/',
                },
            ],
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|ico)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]'
                }
            }
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        open: true, // open in default browser
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },
        port: 8800,
    },
}
