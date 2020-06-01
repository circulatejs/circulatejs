const fs = require('fs');
const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();

const createNew = (path) => {
    env.register(require.resolve('./generators/new-circulatejs'), 'create-new:circulatejs');
    env.run('create-new:circulatejs', { path })
}

module.exports = {
    createNew
}
