'use strict'

const Hapi = require('@hapi/hapi')
const colors = require('colors/safe')

const database = require('./app/database')
const plugins = require('./app/plugins/index')
const settings = require('./app/settings')
const checkInitialUser = require('./app/users/initial')

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

  await server.register(database)

  server.ext('onPreStart', checkInitialUser, {
    before: '@circulatejs/users',
    after: 'schwifty'
  })

  await server.register([
    require('@hapi/inert'),
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
