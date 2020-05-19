const glob = require('glob');

('use strict');

const pluginPaths = glob.sync(`${process.cwd()}/plugins/*`);
const plugins = [];

// console.log(pluginPaths)

const pluginsLoad = async server => {
    pluginPaths.forEach(plugin => {
        // console.log(plugin)
        // plugins.push(require(`${plugin}`));
    });

    await server.register(plugins, {
        routes: {
            prefix: '/api'
        }
    });
};

module.exports = pluginsLoad;
