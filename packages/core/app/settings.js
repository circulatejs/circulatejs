require('dotenv').config();

const settings = {
    APP_NAME: process.env.APP_NAME || 'CirculateJS',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_NAME: process.env.DB_NAME || 'circulatejs',
    AUTH_KEY: process.env.AUTH_KEY || null,
    ADMIN_LOCATION: process.env.ADMIN_LOCATION || '/admin',
    API_PATH: process.env.API_PATH || '/api',
    PLUGINS_PATH: process.env.PLUGINS_PATH || '/plugins',
};

module.exports = settings;
