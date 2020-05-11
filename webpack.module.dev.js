'use strict';

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const host = require('./.config/ip')()

// const moduleName = 'channel'
// const moduleName = 'comment'
// const moduleName = 'apppush'
// const moduleName = 'statistics'
// const moduleName = 'interface'
// const moduleName = 'settings'
// const moduleName = 'AppManage'
// const moduleName = 'cloud'
// const moduleName = 'vmsDataMng'
// const moduleName = 'member'
// const moduleName = 'content'
// const moduleName = 'contentlist'
// const moduleName = 'report'
const moduleName = 'contributes'
// const moduleName = 'workflow'
// const moduleName = 'subject'
// const moduleName = 'advertise'

const port = 3123
module.exports = merge(common, {
    devtool: "inline-source-map",
    mode: "development",
    entry: {
        entry: "./src/pages/" + moduleName + "/routes"
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
            template: "./src/index.module.dev.html",
            host: host,
        }),
    ]
});