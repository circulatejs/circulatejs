'use strict';

const Hapi = require('@hapi/hapi');
const Schwifty = require('schwifty');
const plugins = require('./app/plugins');

require('dotenv').config();

// Clear the console output when we start the server
console.clear()

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
    // await server.register(require('@hapi/inert'));
    await server.register([
        require('@hapi/inert'),
        require('./app/models'),
        require('./app/controllers'),
        require('./app/admin')
    ]);
    // await server.register([require('./app/controllers')]);
    await plugins(server);
    // await server.register(require('./app/admin'));

    await server.start();

    console.log('Your CirculateJS server is running at %s', server.info.uri);
};

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

start();
