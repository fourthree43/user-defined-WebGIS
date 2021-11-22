/*
 * @Author: 张仕山
 * @Date: 2021-07-08 22:31:17
 * @LastEditors: 张仕山
 * @LastEditTime: 2021-08-04 21:27:44
 * @Description:
 * @FilePath: \webpack.config.js
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// let indexCss = new ExtractTextWebpackPlugin("./src/assets/index.css");
// let indexLess = new ExtractTextWebpackPlugin("./src/assets/index.less");

module.exports = {
  mode: "development", // "production"
  // (1)单入口文件
  // entry: "./src/index.js",
  // (2)多入口文件
  entry: {
    main: "./src/index.js",
    // other: "./src/triangulation.js",
    // animation: "./src/particleAnimationAffineTransfromation.js",
    // texture: "./src/texture.js",

    // shader: "./src/shaderTest.js",
  },

  devServer: {
    host: "localhost",
    port: 3030,
    hot: true,
    open: true,
    contentBase: path.join(__dirname, "dist"),
  },
  devtool: "source-map",

  output: {
    path: path.resolve("@babel/polyfill", __dirname, "dist"),
    filename: "[name].js",
  },
  // 具备处理其他类型文件得能力，并转换为有效模块,转换某些类型得模块
  // loader
  module: {
    rules: [
      // @(1) txt
      //   {
      //     test: /\.txt$/,
      //     use: "raw-loader",
      //   },
      // @(2) ts
      //   {
      //     test: /\.ts$/,
      //     use: "ts-loader",
      //   },
      // @(3) js
      // {
      //   test: /\.(js|jsx)$/,
      //   use: {
      //     loader: "babel-loader",
      //     // options: {
      //     //   presets: ["@babel/preset-env"],
      //     // },
      //     exclude: path.resolve(__dirname, "node_modules"),
      //   },
      // },
      // @(4) css
      //   //（1） css处理
      //   {
      //     test: /\.css$/,
      //     use: "css-loader",
      //   },
      //   //（2） css处理
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: "style-loader" },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //       },
      //     },
      //     // { loader: "less-loader" },
      //   ],
      // },
      // (1)单独配置xx.css打包规则
      {
        test: /.css$/,
        // use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
        use: ["style-loader", "css-loader"],
      },
      // (2)单独配置xx.less打包规则
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", "less-loader"], // 从右向左解析原则
      // },

      // 为css添加浏览器前缀
      // npm install --save-dev postcss-loader autoprefixer
      // (1)
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", "postcss-loader", "less-loader"], // 从右向左解析原则
      // },
      // (2)
      // {
      //   test: /\.less$/,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         plugins: [require("autoprefixer")], //浏览器前缀
      //       },
      //     },
      //     "less-loader",
      //   ], // 从右向左解析原则
      // },

      // css外部链接引入
      // npm install --save-dev mini-css-extract-plugin

      // @(5)
      // 打包图片、字体、媒体...
      // file-loader就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中
      // url-loader 一般与file-loader搭配使用，功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中
      // 图片
      {
        test: /\.(jp?g|png|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              name: "img/[name].[hash:8].[ext]",
            },
          },
        },
      },
      // 媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "media/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
      // 字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  // 插件用于执行范围更广得任务：打包优化、资源管理、注入环境变量
  plugins: [
    new webpack.ProgressPlugin(),
    // html文件自动引入脚本xx.index
    // （1）对应单入口文件
    // new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // （2）对应多入口文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["main"], // 与入口文件对应的模块名
      // chunks: ["main", "other", "animation", "texture"], // 与入口文件对应的模块名
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "src/shader.html"),
    //   filename: "shader.html",
    //   chunks: ["shader"], // 与入口文件对应的模块名
    // }),

    // 清除上次build遗留文件
    new CleanWebpackPlugin(),

    // 拆分css(外部链接引入)，集合成单个文件

    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),

    // 拆分css(外部链接引入)，拆分多个文件，一一对应
    // npm i -D extract-text-webpack-plugin@next
    // indexLess,
    // indexCss,

    new webpack.HotModuleReplacementPlugin(),
  ],
};
