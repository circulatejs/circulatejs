const glob = require('glob');

('use strict');

const controllerPath = glob.sync('plugins/**/Controllers/*');
let controllers = {};

controllerPath.forEach(controller => {
    const controllerLoader = require(`../${controller}`);
    Object.assign(controllers, controllerLoader);
});

exports.plugin = {
    name: 'controllers',
    multiple: true,
    register: async server => {
        server.decorate('server', 'controllers', controllers);
    }
};
