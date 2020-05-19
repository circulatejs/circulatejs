const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const cliProgress = require('cli-progress')
const colors = require('colors/safe');

const config = require(__dirname + '/webpack.config')
const compiler = webpack(config)
const Progress = new cliProgress.SingleBar({
  format: 'Building Admin ' + colors.green('{bar}') + ' {percentage}%',
  clearOnComplete: true
}, cliProgress.Presets.shades_classic)

compiler.apply(new ProgressPlugin((percent, msg) => {
  let percentage = percent * 100
  // console.log((percent * 100) +'%', msg)
  Progress.update(percentage)
  if (percentage === 100) {
    setTimeout(() => {
      Progress.stop()
      console.clear()
      console.log('Admin build complete')
    }, 100)
  }
}))

function build() {
  Progress.start(100, 0)
  // webpack(config, (err, stats) => { // Stats Object
  //   if (err || stats.hasErrors()) {
  //     // Handle errors here
  //   }
  //   // if ()
  //   console.log(stats.toString({
  //     chunks: false,  // Makes the build much quieter
  //     colors: true    // Shows colors in the console
  //   }));
  //   // stats.toJson('minimal');
  //   console.log('Admin build complete.')
  // })
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('There was an error building admin')
    }
  })
}

module.exports = () => { build() }
