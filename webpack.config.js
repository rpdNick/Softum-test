const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    mode: 'development',
    entry: './js/index.js',
    devtool: "source-map",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                MiniCssExtractPlugin.loader, // extract css into files
                "css-loader", // convert css to js string css
                ],
            },
        ],
    },
};