require('dotenv').config();

const settings = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_NAME: process.env.DB_NAME || 'circulatejs',
    ADMIN_LOCATION: process.env.ADMIN_LOCATION || '/admin',
    API_PATH: process.env.API_PATH || '/api'
}

module.exports = settings
