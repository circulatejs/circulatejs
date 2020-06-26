#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = process.cwd() + '/package.json'

try {
  if (fs.existsSync(path)) {
    const pkg = require(path)
    // eslint-disable-next-line
    if (typeof pkg.dependencies['@circulatejs/core'] !== undefined) {
      require('./cli')
    } else {
      console.error('CirculateJS is not installed in this project.')
    }
  } else {
    console.error('There is no package that exists in this directory')
  }
} catch (err) {
  console.error(err)
}
