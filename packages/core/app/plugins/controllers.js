'use strict'

const glob = require('glob')

module.exports = async (path, server) => {
  const controllerPath = glob.sync(`${path}/*`)
  const controllersObject = {}

  if (controllerPath.length) {
    controllerPath.forEach((controller) => {
      const controllerLoader = require(controller)
      Object.assign(controllersObject, controllerLoader)
    })
  }

  if (controllerPath.length) {
    const options = {
      extend: false
    }
    let controllersToAdd = controllersObject

    if (server.controllers) {
      options.extend = true
      controllersToAdd = (controllers) => {
        return { ...controllers, ...controllersObject }
      }
    }

    return await server.decorate('server', 'controllers', controllersToAdd, options)
  }
}
