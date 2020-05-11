const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const dayjs = require('dayjs');
const dir = dayjs().format('YYYYMMDD')
const common = require("./webpack.common.js");
const moduleName = 'app'
module.exports = merge(common, {
    devtool: "source-map",
    mode: "production",
    entry: {
        globalApp: "./src/globalApp/index",
    },
    output: {
        path: path.resolve(__dirname, "dist/globalApp/" + dir),
        filename: "[name].js",
        publicPath: "./dist/module-" + moduleName + "/" + dir + "/",
        libraryTarget: "umd",
        library: moduleName,
        umdNamedDefine: true
    },
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true, })],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist/globalApp")]
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
});