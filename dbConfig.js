const { Pool } = require('pg');
module.exports = new Pool({
    connectionString: process.env.DB_URL | 'DATABASE_URL',
    user: process.env.DB_USER | 'USER',
    password: process.env.PASSWORD | 'PASSWORD',
    database: process.env.DB_NAME | 'DATABASE_NAME',
    host: process.env.HOST | 'localhost',
    port: process.env.PORT | 5432,
});