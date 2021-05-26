'use strict'

const path = require('path')
const fs = require('fs')
const glob = require('glob')
const colors = require('colors/safe')

const modelLoader = require('./models')
const controllerLoader = require('./controllers')
const settings = require('../settings')

const pluginPaths = glob.sync(`${process.cwd()}${settings.PLUGINS_PATH}/*`)
const plugins = []

const loadPlugins = async (server) => {
  pluginPaths.forEach((pluginPath, index) => {
    const manifestPath = `${pluginPath}/manifest.json`
    if (fs.existsSync(manifestPath)) {
      const manifestFile = fs.readFileSync(manifestPath)
      const manifest = JSON.parse(manifestFile)
      const routesBase = require(`${pluginPath}/routes`)
      const plugin = {}

      plugin.name = manifest.name
      plugin.version = manifest.version

      // Load models for the plugin
      modelLoader(`${pluginPath}/models`, server)

      // Load controllers for the plugin
      controllerLoader(`${pluginPath}/controllers`, server)

      // Build plugin registration here
      plugin.register = async (server) => {
        // Check for dependencies first before registering the plugin
        server.dependency(manifest.dependencies)
        const routes = routesBase.routes(server)

        routes.admin.forEach((route) => {
          route.path = `${settings.ADMIN_LOCATION}/api${route.path}`
          if (route.options === undefined) {
            route.options = {}
          }
          if (!route.options.auth) {
            route.options.auth = 'jwt'
          }
          return server.route(route)
        })
        routes.api.forEach((route) => {
          route.path = `${settings.API_PATH}${route.path}`
          return server.route(route)
        })
        routes.web.forEach((route) => {
          return server.route(route)
        })
      }

      plugins.push(plugin)
    } else {
      console.log(
        colors.yellow(
          `WARNING: A plugin is attempting to be loaded, but no plugin manifest exists for /${path.relative(
            process.cwd(),
            pluginPath
          )}`
        )
      )
      if (index + 1 === pluginPaths.length) {
        console.log('')
      }
    }
  })

  await server.register(plugins)
}

module.exports = loadPlugins
