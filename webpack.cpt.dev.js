'use strict';

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const host = require('./.config/ip')()

const port = 3121

const moduleName = 'SlateEditer'
// const moduleName = 'ResourceManager'
// const moduleName = 'JsonSchemaForm'
module.exports = merge(common, {
    devtool: "inline-source-map",
    mode: "development",
    entry: {
        index: "./src/globalComponents/" + moduleName + '/app',
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: moduleName,
        umdNamedDefine: true
    },
    devServer: {
        contentBase: "./",
        port: port,
        compress: true,
        host: host,
        disableHostCheck: true,
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.cpt.dev.html",
            host: host,
        }),
    ]
});