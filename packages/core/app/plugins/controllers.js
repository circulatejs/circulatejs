'use strict'

const glob = require('glob')

module.exports = async (path, server, pluginName) => {
  const controllerPath = glob.sync(`${path}/*`)
  const controllers = {}

  if (controllerPath.length) {
    controllerPath.forEach((controller) => {
      const controllerLoader = require(controller)
      Object.assign(controllers, controllerLoader)
    })
  }

  if (controllerPath.length) {
    return await server.decorate('server', `controller.${pluginName}`, controllers)
  }
}
