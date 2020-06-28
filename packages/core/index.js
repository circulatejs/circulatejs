'use strict'

const Hapi = require('@hapi/hapi')
const Schwifty = require('schwifty')
const colors = require('colors/safe')

const plugins = require('./app/plugins')
const settings = require('./app/settings')
const checkInitialUser = require('./app/users/initial')

// Set DB types
let client
let connection
if (settings.DB === 'sqlite') {
  client = 'sqlite3'
  connection = {
    filename: settings.DB_NAME + '.sqlite'
  }
} else if (settings.DB === 'mysql') {
  client = 'mysql2'
  connection = {
    host: settings.DB_HOST,
    port: settings.DB_PORT,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_NAME
  }
}

// Clear the console output when we start the server
console.clear()

const start = async () => {
  const serverOptions = {
    port: settings.PORT,
    host: settings.HOST
  }

  const server = Hapi.server(serverOptions)

  await server.register(require('hapi-auth-jwt2'))
  server.auth.strategy('jwt', 'jwt', {
    key: settings.AUTH_KEY,
    validate: require('./app/auth')
  })
  await server.register({
    plugin: Schwifty,
    options: {
      knex: {
        client,
        useNullAsDefault: true,
        connection
      }
    }
  })

  server.ext('onPreStart', checkInitialUser, {
    before: '@circulatejs/users',
    after: 'schwifty'
  })

  await server.register([
    require('@hapi/inert'),
    require('./app/models'),
    require('./app/controllers'),
    require('./app/admin'),
    require('./app/users/plugin')
  ])
  await plugins(server)

  await server.initialize()

  await server.start()

  console.log('Your CirculateJS server is running at %s', server.info.uri)
  console.log('')
  console.log(
    colors.blue('Your CirculateJS Admin is running at %s'),
    server.info.uri + settings.ADMIN_LOCATION
  )
}

process.on('unhandledRejection', (err) => {
  if (err) {
    console.error(err)
  }
  process.exit(1)
})

start()
