const glob = require('glob');

('use strict');

// const controllerPath = glob.sync('Controllers/*');
// controllerPath.forEach(controller => {
//     module.exports = require(`../${controller}`);
// });

const controllerPath = glob.sync('plugins/**/Controllers/*');
// console.log(controllerPath);
controllerPath.forEach(controller => {
    console.log(controllerPath);
    const controllerLoader = require(`../${controller}`);

    // console.log(controllerLoader);
    // server.method('controllers', controllerLoader);
    // server.decorate('server', controller, internals.models(server));

    exports.plugin = {
        name: 'controllers',
        multiple: true,
        register: async (server, options) => {
            server.decorate('server', 'controllers', controllerLoader);
        }
    };
});
