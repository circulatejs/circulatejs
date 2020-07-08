const yeoman = require('yeoman-environment')
const env = yeoman.createEnv()

const createNew = (path) => {
  env.register(require.resolve('./generators/new-circulatejs'), 'create-new:circulatejs')
  env.run('create-new:circulatejs', { path })
}

const createPlugin = (path) => {
  env.register(require.resolve('./generators/new-plugin'), 'create:plugin')
  env.run('create:plugin', { path })
}

module.exports = {
  createNew,
  createPlugin
}
