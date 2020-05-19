const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const adminPath = __dirname
const workingDir = process.cwd()

const pluginsPath = path.join(__dirname, '..', 'circulate', 'plugins');

console.log(pluginsPath)

// console.log(JSON.stringify(path.relative('./', pluginsPath)))

module.exports = {
  mode: 'production',
  entry: `${adminPath}/src/main.js`,
  output: {
    path: `${workingDir}/admin`
  },
  stats: {
    assets: false
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
    new webpack.DefinePlugin({ ADMIN_PLUGINS: JSON.stringify(pluginsPath) })
  ]
};
