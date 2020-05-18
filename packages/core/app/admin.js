const adminBuild = require('@circulatejs/admin');

exports.plugin = {
    name: 'admin',
    register: async (server) => {
        await server.route({
            method: 'GET',
            path: process.env.ADMIN_LOCATION + '/{param*}',
            handler: {
                directory: {
                    path: './admin/',
                    index: ['index.html']
                }
            }
        });

        await adminBuild
    }
};
