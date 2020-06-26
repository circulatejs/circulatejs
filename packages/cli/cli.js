const { program } = require('commander')
const createPlugin = require('@circulatejs/generators').createPlugin

require('dotenv').config()

const pluginPath = process.env.PLUGINS_PATH || '/plugins'

program
  .command('create:plugin')
  .description('This creates a plugin for CirculateJS')
  .action(() => {
    createPlugin(pluginPath)
  })

program.parse(process.argv)
