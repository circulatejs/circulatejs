'use strict'

const glob = require('glob')

module.exports = (path, server) => {
  const modelPath = glob.sync(`${path}/*`)
  if (modelPath.length) {
    modelPath.forEach((model) => {
      const modelLoader = require(model)
      return modelLoader(server)
    })
  }
}
