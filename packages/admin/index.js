const path = require('path')
const fs = require('fs-extra')
const cwd = process.cwd()

const Service = require('@vue/cli-service');
const service = new Service(cwd);

const adminPath = path.join(cwd, '/node_modules/@circulatejs/admin', '/src');

const buildAdmin = async () => {
  return await new Promise((resolve, reject) => {
    try {
      resolve(runBuild())
    } catch (err) {
      reject(console.error(err))
    }
  })
}

async function runBuild() {
  await fs.copy(adminPath, cwd + '/src')
  console.log('Temp directory created')
  await service.init('production');
  await service.run('build').then(() => {
    console.log('Admin build complete');
    // fs.removeSync(cwd + '/src')
  });
}

module.exports = buildAdmin()
