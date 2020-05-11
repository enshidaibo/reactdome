var path = require("path");
var webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    entry: {
        vendor: ["seamless-immutable", "react-router-dom", "qs", "axios", "crypto-js", "slate", "slate-react"],
    },
    output: {
        path: path.join(__dirname, "dist/dll"),
        filename: "[name].dll.[hash:8].js",
        // filename: "[name].dll.js",
        library: "[name]_library"
        //Combine this plugins with output.library option to expose the dll function i. e. into the global scope.
    },
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true, })],
    },
    //output file is in dist/dll folder
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.resolve("./dist/dll", "[name]-manifest.json"),
            name: "[name]_library"
        }),
        new ProgressBarPlugin(),
    ],
    resolve: {
        // root: path.resolve(__dirname, "client"),
        // modulesDirectories: ["node_modules"]
        // webpack2 use modules to replace all this configurations
        modules: ["node_modules", path.resolve(__dirname, "client")]
    }
};