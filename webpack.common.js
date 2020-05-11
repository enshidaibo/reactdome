const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const lessToJs = require("less-vars-to-js");
const paletteLess = fs.readFileSync("./theme.less", "utf8");
const theme = lessToJs(paletteLess);
module.exports = {
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM",
        axios: "axios",
        antd: "antd",
        echarts: "echarts",
        moment: "moment"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".web.js", "json", ".react.js"],
        alias: {
            '@': path.resolve(__dirname, "src/"),
            src: path.resolve(__dirname, "src/"),
            Libs: path.resolve(__dirname, "src/Libs/"),
            Components: path.resolve(__dirname, "src/Libs/Components/"),
            Extended: path.resolve(__dirname, "src/Libs/Extended/"),
        }
    },
    module: {
        rules: [
            { parser: { system: false } }, {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[name]_[local]_[hash:base64:5]"
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                use: ["ts-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src')],
                use: "eslint-loader"
            },
            {
                test: /\.(svg)$/i,
                loader: "svg-sprite-loader",
                // include: [
                //     require.resolve("antd").replace(/warn\.js$/, "") // antd-mobile 内置svg
                //     // require.resolve("antd-mobile").replace(/warn\.js$/, "") // antd-mobile 内置svg
                //     // path.resolve(__dirname, 'public/svg'),  // 业务代码本地私有 svg 存放目录
                // ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "images/[name]-[hash:8].[ext]"
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        // new webpack.DllReferencePlugin({
        //     manifest: require("./dist/dll/vendor-manifest.json")
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest: require("./dist/dll/echarts-manifest.json")
        // }),
    ]
};