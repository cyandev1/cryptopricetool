const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssWebpack = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
      },
    optimization: {
        minimizer: [
            new OptimizeCssWebpack(), 
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: "template.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })    
        ] 
    }, 
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), 
        new CleanWebpackPlugin(), 
       //new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
});