require('dotenv').config()

const processEnv = process.env

module.exports = {
  ENV: processEnv.ENV || 'production',
  APP_NAME: processEnv.APP_NAME || 'CirculateJS',
  HOST: processEnv.HOST || 'localhost',
  PORT: processEnv.PORT || 3000,
  DB: processEnv.DB || 'sqlite',
  DB_HOST: processEnv.DB_HOST || '127.0.0.1',
  DB_PORT: processEnv.DB_PORT || 3306,
  DB_NAME: processEnv.DB_NAME || 'circulatejs',
  DB_USER: processEnv.DB_USER || '',
  DB_PASSWORD: processEnv.DB_PASSWORD || '',
  AUTH_KEY: processEnv.AUTH_KEY || null,
  ADMIN_LOCATION: processEnv.ADMIN_LOCATION || '/admin',
  API_PATH: processEnv.API_PATH || '/api',
  PLUGINS_PATH: processEnv.PLUGINS_PATH || '/plugins'
}
