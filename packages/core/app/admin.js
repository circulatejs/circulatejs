const admin = require('@circulatejs/admin');
const settings = require('./settings')

const adminPath = settings.ADMIN_LOCATION

exports.plugin = {
    name: 'admin',
    register: async (server) => {
        await server.route({
            method: 'GET',
            path: adminPath,
            handler: (request, h) => {
                // This needs to be done to make sure the base path forwards properly
                if (request.path = `/${adminPath}`) {
                    return h.redirect(`${adminPath}/`)
                }
            }
        });
        await server.route({
            method: 'GET',
            path: `${adminPath}/{param*}`,
            handler: {
                directory: {
                    path: './admin',
                    index: ['index.html'],
                    redirectToSlash: true
                }
            }
        });

        await admin.buildAdmin()
    }
};
