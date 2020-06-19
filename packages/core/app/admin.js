const path = require('path');
const admin = require('@circulatejs/admin');
const settings = require('./settings');

const adminUrl = settings.ADMIN_LOCATION
const adminPath = path.join(process.cwd(), '.admin')

exports.plugin = {
    name: 'admin',
    register: async (server) => {

        // Create the front end routes
        await server.route({
            method: 'GET',
            path: adminUrl,
            handler: (request, h) => {
                // This needs to be done to make sure the base path forwards properly
                if (request.path = `/${adminUrl}`) {
                    return h.redirect(`${adminUrl}/`)
                }
            }
        });
        await server.route({
            method: 'GET',
            path: `${adminUrl}/{param*}`,
            handler: {
                directory: {
                    path: adminPath,
                    redirectToSlash: true,
                    index: 'index.html',
                }
            }
        });

        // Auth Route
        // This is checked every single time you move to an admin route
        await server.route({
            method: 'GET',
            path: `${adminUrl}/api/auth`,
            handler: async (request, h) => {
                if (request.auth.isAuthenticated) {
                    return await h.response({ adminAccess: true });
                } else {
                    return await h.response({ adminAccess: false });
                }
            },
            options: {
                auth: 'jwt'
            }
        });

        // This is used to make sure we route back to index if you refresh the browser
        server.ext('onPreResponse', (request, h) => {
            const { response, route } = request;
            const fingerprint = route.fingerprint === `${adminUrl}/#`;
            if (fingerprint && response.isBoom && response.output.statusCode === 404) {
                return h.file(`${adminPath}/index.html`);
            }
            return h.continue;
        });

        await admin.buildAdmin()
    }
};
