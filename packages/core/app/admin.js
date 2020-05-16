const admin = require('@circulatejs/admin');

// const adminPaths = glob.sync('plugins/admin/*');
// const adminPages = [];

// // const adminPagesToLoad = async () => {
//     adminPaths.forEach(adminPage => {
//         console.log(adminPage)
//         adminPages.push(`import ${adminPage}`);
//     });
// // };

// // adminPagesToLoad()

// console.log(adminPages)

console.log(admin)

admin()

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

        // await admin.importAdminPages(adminPagesToLoad)

        // await adminBuild
    }
};
