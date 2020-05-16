const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const adminPath = __dirname
const workingDir = process.cwd()

module.exports = {
  entry: `${adminPath}/src/main.js`,
  output: {
    path: `${workingDir}/admin`
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${adminPath}/src/index.html`,
    }),
    new VueLoaderPlugin(),
  ]
};
