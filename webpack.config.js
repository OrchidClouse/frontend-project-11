// const path = require("path")
// const autoprefixer = require("autoprefixer")
// const HtmlWebpackPlugin = require("html-webpack-plugin")

// module.exports = {
//   mode: "development",
//   entry: "./src/js/index.js",
//   output: {
//     filename: "main.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   experiments: {
//     topLevelAwait: true,
//   },
//   devServer: {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     static: path.resolve(__dirname, "dist"),
//     port: 8080,
//     hot: true,
//   },
//   plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],

//   module: {
//     rules: [
//       {
//         test: /\.(scss)$/,
//         use: [
//           {
//             // Adds CSS to the DOM by injecting a `<style>` tag
//             loader: "style-loader",
//           },
//           {
//             // Interprets `@import` and `url()` like `import/require()` and will resolve them
//             loader: "css-loader",
//           },
//           {
//             // Loader for webpack to process CSS with PostCSS
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: () => [autoprefixer],
//               },
//             },
//           },
//           {
//             // Loads a SASS/SCSS file and compiles it to CSS
//             loader: "sass-loader",
//           },
//         ],
//       },
//     ],
//   },
// }
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
