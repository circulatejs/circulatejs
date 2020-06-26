const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const adminPath = __dirname
const workingDir = process.cwd()

require('dotenv').config()

const pluginsPath = path.join(__dirname, '..', 'circulate', 'plugins')
const envAdmin = process.env.ADMIN_LOCATION || '/admin'
const appName = process.env.APP_NAME || 'CirculateJS Admin'
const adminDev = (process.env.ENV === 'development' && process.env.ADMIN_DEV) || false

module.exports = {
  mode: process.env.ENV || 'production',
  entry: `${adminPath}/src/main.js`,
  output: {
    path: `${workingDir}/.admin`,
    filename: 'admin.js'
  },
  stats: {
    assets: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
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
      {
        test: /\.css$/,
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img',
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${adminPath}/src/index.html`,
      alwaysWriteToDisk: true
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      ADMIN_PLUGINS: JSON.stringify(pluginsPath),
      ADMIN_LOCATION: JSON.stringify(envAdmin),
      APP_NAME: JSON.stringify(appName),
      ADMIN_DEV: JSON.stringify(adminDev)
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/admin/api': {
        target: `http://${process.env.HOST}:${process.env.PORT}`,
        changeOrigin: true
      }
    }
  }
}
