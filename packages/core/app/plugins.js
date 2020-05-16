const glob = require('glob');

('use strict');

const pluginPaths = glob.sync('plugins/*');
const plugins = [];

const pluginsLoad = async server => {
    pluginPaths.forEach(plugin => {
        plugins.push(require(`${process.cwd()}/${plugin}`));
    });

    await server.register(plugins, {
        routes: {
            prefix: '/api'
        }
    });
};

module.exports = pluginsLoad;
