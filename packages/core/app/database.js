const Schwifty = require('schwifty')

const settings = require('./settings')

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

exports.module = {
  plugin: Schwifty,
  options: {
    knex: {
      client,
      useNullAsDefault: true,
      connection
    }
  }
}
