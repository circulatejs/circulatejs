const path = require('path')
const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const cliProgress = require('cli-progress')
const colors = require('colors/safe')

const config = require(path.join(__dirname, '/webpack.config'))
const compiler = webpack(config)
const ProgressBar = new cliProgress.SingleBar({
  format: 'Building Admin ' + colors.blue('{bar}') + ' {percentage}% {msg}',
  clearOnComplete: true,
  hideCursor: true
}, cliProgress.Presets.shades_classic)
const admin = {}

let percentage = 0
let message = ''

new ProgressPlugin((percent, msg) => {
  percentage = percent * 100
  message = msg ? '| ' + msg : ''

  ProgressBar.update(percentage, {
    msg: message
  })

  if (percentage === 100) {
    ProgressBar.stop()
  }
}).apply(compiler)

admin.buildAdmin = async () => {
  ProgressBar.start(100, 0, {
    msg: ''
  })

  return await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        const error = err || stats.compilation.errors
        reject(setErrors(error))
      } else {
        resolve(setAdminComplete())
      }
    })
  })
}

function setAdminComplete () {
  if (compiler.hooks.done) {
    console.log(colors.blue('Admin build complete\n'))
  }
}
function setErrors (err) {
  console.log(colors.red('There was an error building admin\n'))
  if (err) {
    console.log(err)
  }
  console.log('')
}

module.exports = admin
