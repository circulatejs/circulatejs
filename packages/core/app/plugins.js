const path = require('path');
const fs = require('fs');
const glob = require('glob');
const colors = require('colors/safe');

const settings = require('./settings');

('use strict');

const pluginPaths = glob.sync(`${process.cwd()}/plugins/*`);
const plugins = [];

const pluginsLoad = async server => {
    pluginPaths.forEach((plugin, index) => {
        const pluginFilePath = `${plugin}/index.js`
        let pluginFile = {}

        if (fs.existsSync(pluginFilePath)) {
            pluginFile = require(pluginFilePath)
            pluginFile.routes = {
                prefix: settings.API_PATH
            }

            if (pluginFile.plugin && pluginFile.plugin.prefix) {
                pluginFile.routes = {
                    prefix: pluginFile.plugin.prefix || settings.API_PATH
                }
            }

            plugins.push(pluginFile);
        } else {
            console.log(colors.yellow(`WARNING: A plugin is attempting to be loaded, but no plugin index exists for /${path.relative(process.cwd(), plugin)}`))
            if (index + 1 === pluginPaths.length) {
                console.log('')
            }
        }
    });

    await server.register(plugins)
};

module.exports = pluginsLoad;
