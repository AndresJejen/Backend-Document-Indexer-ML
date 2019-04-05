require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    MONGODB_SERVER : process.env.MONGODB_SERVER || '127.0.0.1',
    MONGODB_HEAD : process.env.MONGODB_HEAD || 'mongodb://',
    MONGODB_DB : process.env.MONGODB_DB || '/Pagina', 
    MONGODB_PORT : process.env.MONGODB_PORT || '27017',
    MONGODB_USER : process.env.MONGODB_USER || '',
    MONGODB_PASSWORD :process.env.MONGODB_PASSWORD || ''
}