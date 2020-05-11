const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const workboxPlugin = require('workbox-webpack-plugin');
const dayjs = require('dayjs');
const dir = dayjs().format('YYYYMMDD')
const common = require("./webpack.common.js");
module.exports = merge(common, {
    devtool: "source-map",
    mode: "production",
    entry: {
        app: "./src/app"
    },
    output: {
        path: path.resolve(__dirname, "dist/main/" + dir),
        filename: "[name]-[chunkhash].js",
        // publicPath: "./dist/main/" + dir + "/",
        publicPath: "https://rmy.estv.com.cn/dist/main/" + dir + "/",
        // sourceMapFilename: "[name].map"
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [new TerserPlugin({ sourceMap: true, })],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist/main")]
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn)$/),
        new HtmlWebpackPlugin({
            filename: "../../index.html",
            template: "./src/index.main.prod.html",
        }),
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin(),
        // new workboxPlugin.InjectManifest({
        //     swSrc: './sw.js',
        //     swDest: '../sw.js',
        //     globDirectory: './dist/' + dir,
        //     globPatterns: ['**/*.{js,css}'],
        //     include: [/\.css$/, /\.js$/],
        //     exclude: ['index.html']
        // })
    ]
});