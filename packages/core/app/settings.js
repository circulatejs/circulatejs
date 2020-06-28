require('dotenv').config()

const proccessEnv = process.env

const settings = {
  ENV: proccessEnv.ENV || 'production',
  APP_NAME: proccessEnv.APP_NAME || 'CirculateJS',
  HOST: proccessEnv.HOST || 'localhost',
  PORT: proccessEnv.PORT || 3000,
  DB: proccessEnv.DB || 'sqlite',
  DB_HOST: proccessEnv.DB_HOST || '127.0.0.1',
  DB_PORT: proccessEnv.DB_PORT || 3306,
  DB_NAME: proccessEnv.DB_NAME || 'circulatejs',
  DB_USER: proccessEnv.DB_USER || '',
  DB_PASSWORD: proccessEnv.DB_PASSWORD || '',
  AUTH_KEY: proccessEnv.AUTH_KEY || null,
  ADMIN_LOCATION: proccessEnv.ADMIN_LOCATION || '/admin',
  API_PATH: proccessEnv.API_PATH || '/api',
  PLUGINS_PATH: proccessEnv.PLUGINS_PATH || '/plugins'
}

module.exports = settings
