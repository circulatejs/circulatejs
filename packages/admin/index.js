const { exec } = require('child_process')

async function buildAdmin() {
  return await new Promise((resolve, reject) => {
    exec(
      __dirname + '/node_modules/.bin/vue-cli-service build',
      (error, stdout, stderr) => {
        if (error) {
          reject(error)
        }
        resolve(stdout, stderr)
      }
    )
  })
}

module.exports = buildAdmin()
  .then(info => {
    console.log(info)
  })
  .catch(error => {
    console.error(error)
  })
