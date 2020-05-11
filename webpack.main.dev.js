const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const host = require('./.config/ip')()
const common = require("./webpack.common.js");
const port = 3111
module.exports = merge(common, {
    devtool: "inline-source-map",
    // devtool: "cheap-module-eval-source-map",
    mode: "development",
    // mode: "production",
    entry: {
        app: "./src/app"
    },
    output: {
        filename: "[name].main.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "http://" + host + ":" + port + "/",
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
            template: "./src/index.main.dev.html",
            host: host,
            title: "云上恩施app",
        }),
    ]
});