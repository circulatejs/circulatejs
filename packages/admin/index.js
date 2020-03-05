const path = require('path')
const fs = require('fs-extra')
const cwd = process.cwd()

const Service = require('@vue/cli-service');
const service = new Service(cwd);

const adminPath = path.join(cwd, '/node_modules/@circulatejs/admin', '/src');

async function buildAdmin() {
  try {
    await fs.copy(adminPath, cwd + '/src')
    console.log('Temp directory created')
    await service.init('production');
    await service.run('build').then(() => {
      console.log('Admin built');
      fs.removeSync(cwd + '/src')
    });
  } catch (err) {
    console.error(err)
  }
}

buildAdmin()
