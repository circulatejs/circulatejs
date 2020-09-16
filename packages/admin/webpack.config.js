const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const adminPath = __dirname
const workingDir = process.cwd()
const tailwindConfigPath = `${adminPath}/tailwind.config.js`

require('dotenv').config()

const pluginsPath = `${workingDir}/${process.env.PLUGINS_PATH}` || `${workingDir}/plugins`
const envAdmin = process.env.ADMIN_LOCATION || '/admin'
const appName = process.env.APP_NAME || 'CirculateJS Admin'
const adminDevSetting = process.env.ADMIN_DEV === 'true' || false
const adminDev = process.env.ENV === 'development' && adminDevSetting

const tablerIcons = require.resolve('tabler-icons/tabler-sprite.svg')

module.exports = {
  mode: process.env.ENV || 'production',
  entry: `${adminPath}/src/main.js`,
  output: {
    path: `${workingDir}/.admin`,
    filename: 'js/admin.js'
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
              plugins: [require('tailwindcss')(tailwindConfigPath), require('autoprefixer')]
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
              plugins: [require('tailwindcss')(tailwindConfigPath), require('autoprefixer')]
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
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: tablerIcons, to: 'svg' }]
    }),
    new HtmlWebpackPlugin({
      template: `${adminPath}/src/index.html`
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      ADMIN_PLUGINS: JSON.stringify(pluginsPath),
      ADMIN_LOCATION: JSON.stringify(envAdmin),
      APP_NAME: JSON.stringify(appName),
      ADMIN_DEV: JSON.stringify(adminDev),
      SCREEN_SIZES: JSON.stringify(require(tailwindConfigPath).theme.screens)
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
