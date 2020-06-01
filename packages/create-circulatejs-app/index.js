#!/usr/bin/env node
'use strict'

const path = require('path');
const fs = require('fs-extra');
const colors = require('colors');
const { program } = require('commander');
const circulateGenerator = require('@circulatejs/generators');

let project

program
    .arguments('<directory>')
    .action(cmd => {
        project = cmd
    })

program.parse(process.argv);

if (project === undefined) {
    console.error('Project name must be specified'.red)
    process.exit(1)
}

circulateGenerator.createNew(`./${project}`)
