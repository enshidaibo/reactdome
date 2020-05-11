'use strict';
// process.env.M_ENV = 'development';

const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const workboxPlugin = require('workbox-webpack-plugin');
const dayjs = require('dayjs');
const dir = dayjs().format('YYYYMMDD')
const common = require("./webpack.common.js");

// const moduleName = 'content'
// const moduleName = 'contentlist'
// const moduleName = 'report'
const moduleName = 'contributes'
// const moduleName = 'channel'
// const moduleName = 'comment'
// const moduleName = 'apppush'
// const moduleName = 'statistics'

// const moduleName = 'cloud'
// const moduleName = 'vmsDataMng'
// const moduleName = 'member'
// const moduleName = 'interface'
// const moduleName = 'settings'
// const moduleName = 'appmanage'
// const moduleName = 'workflow'
// const moduleName = 'subject'
// const moduleName = 'advertise'

module.exports = merge(common, {
    devtool: "source-map",
    mode: "production",
    entry: {
        entry: "./src/pages/" + moduleName + "/routes",
        // entry: "./src/libs/Components/SlateEditer/index",
    },
    output: {
        path: path.resolve(__dirname, "dist/module-" + moduleName + "/" + dir),
        filename: "[name]-[chunkhash].js",
        // publicPath: "./dist/module-" + moduleName + "/" + dir + "/",
        publicPath: "https://rmy.estv.com.cn/dist/module-" + moduleName + "/" + dir + "/",
        libraryTarget: "umd",
        library: 'yssj_' + moduleName,
        umdNamedDefine: true
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minChunks: 1,
        },
        minimizer: [new TerserPlugin({ sourceMap: true, })],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist/module-" + moduleName)]
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn)$/),
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