const glob = require('glob');

('use strict');

exports.plugin = {
    name: 'models',
    register: async (server, options) => {
        let modelPath = glob.sync('plugins/**/Models/*');
        // console.log(modelPath);
        modelPath.forEach(model => {
            let modelLoader = require(`../${model}`);
            modelLoader(server);
        });
    }
};
