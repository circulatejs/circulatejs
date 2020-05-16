const webpack = require('webpack');
const config = require(__dirname + '/webpack.config')

function build() {
  console.log('Building Admin')
  webpack(config, (err, stats) => { // Stats Object
    if (err || stats.hasErrors()) {
      // Handle errors here
    }
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
    console.log('Admin build complete.')
  })
}

module.exports = () => { build() }
