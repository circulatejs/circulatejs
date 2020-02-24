const { exec } = require('child_process')

function buildAdmin() {
  return new Promise((resolve, reject) => {
    exec('vue-cli-service build', (error, stdout) => {
      if (error) {
        reject(console.error(error))
      }
      resolve(console.error(stdout))
    })
  })
}

module.exports = buildAdmin()
