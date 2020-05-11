const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const dayjs = require('dayjs');
const dirVersion = dayjs().format('YYYYMMDD')
const common = require("./webpack.common.js");
// const moduleName = 'SlateEditer'
const moduleName = 'test'

const siteId = 0
// const moduleName = 'JsonSchemaForm'
const pathUrl = "dist/globalCpt/" + moduleName + "/" + siteId + "/" + +dirVersion
module.exports = merge(common, {
    devtool: "source-map",
    mode: "production",
    entry: {
        index: "./src/pages/Test",
    },
    output: {
        path: path.resolve(__dirname, pathUrl),
        filename: "[name]-[chunkhash].js",
        publicPath: "./" + pathUrl,
        // publicPath: "https://yssjcms.estv.com.cn/" + pathUrl,
        libraryTarget: "umd",
        library: moduleName,
        umdNamedDefine: true
    },
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true, })],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, pathUrl)]
        }),
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin(),
    ]
});