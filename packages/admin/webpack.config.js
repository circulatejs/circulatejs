const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

require('dotenv').config()

const adminPath = __dirname
const workingDir = process.cwd()

const pluginsPath = path.join(__dirname, '..', 'circulate', 'plugins');

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
      { test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          // options: {
          //   postcss: [require('postcss-cssnext')()]
          // }
        }
      },
      {
        test: /\.postcss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
              ]
            }
          }
        ]
      },
      { test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
              ]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${adminPath}/src/index.html`,
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      ADMIN_PLUGINS: JSON.stringify(pluginsPath),
      ADMIN_LOCATION: JSON.stringify(process.env.ADMIN_LOCATION || '/admin')
    })
  ]
};
