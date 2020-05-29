#!/usr/bin/env node
'use strict'

const path = require('path')
const fs = require('fs-extra')
const { program } = require('commander');

const circulatePath = path.join(require.resolve('@circulatejs/circulate'), '..')
let project

program
    .arguments('<directory>')
    .action(cmd => {
        project = cmd
    })

program.parse(process.argv);

if (project === undefined) {
    console.error('Project name must be specified')
    process.exit(1)
}

fs.copy(circulatePath, `./${project}`)
    .then(() => {
        console.log('Complete')
    })
    .catch((err) => {
        console.error(err)
    })
