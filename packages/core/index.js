'use strict';

const Hapi = require('@hapi/hapi');
const Schwifty = require('schwifty');
const plugins = require('./app/plugins');
const admin = require('@circulatejs/admin');

// require('test-repo');

require('dotenv').config();

const start = async () => {
    const serverOptions = {
        port: process.env.PORT,
        host: process.env.HOST
    };

    const server = Hapi.server(serverOptions);

    await server.register({
        plugin: Schwifty,
        options: {
            knex: {
                client: 'sqlite3',
                useNullAsDefault: true,
                connection: {
                    filename: process.env.DB_NAME + '.sqlite'
                }
            }
        }
    });
    await server.register(require('inert'));
    await server.register([require('./app/models')]);
    await server.register([require('./app/controllers')]);
    await plugins(server);
    await admin;

    // server.route({
    //     method: 'GET',
    //     path: '/admin',
    //     handler: ((request, h) => {
    //         return h.file('./admin/index.html');
    //     })
    // });

    server.route({
        method: 'GET',
        path: '/admin/{param*}',
        handler: {
            directory: {
                path: './admin/',
                index: ['index.html']
            }
        }
    });

    await server.start();

    console.log('Server running at %s', server.info.uri);
};

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

start();
