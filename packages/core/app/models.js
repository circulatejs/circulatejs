'use strict'

const glob = require('glob')

exports.plugin = {
  name: 'models',
  register: async (server, options) => {
    const modelPath = glob.sync('plugins/**/Models/*')
    modelPath.forEach(model => {
      const modelLoader = require(`../${model}`)
      modelLoader(server)
    })
  }
}
