'use strict';

const glob = require('glob');

const controllerPath = glob.sync('plugins/**/Controllers/*');
const controllers = {};

controllerPath.forEach((controller) => {
    const controllerLoader = require(`../${controller}`);
    Object.assign(controllers, controllerLoader);
});

exports.plugin = {
    name: 'controllers',
    multiple: true,
    register: async (server) => {
        server.decorate('server', 'controllers', controllers);
    },
};
