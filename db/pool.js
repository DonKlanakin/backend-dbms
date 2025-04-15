const { Pool } = require("pg");
const ENV = require("../env/config");
const retry = require("../db/connection");

const pool = new Pool({
    host: ENV.PROD.HOST,
    database: ENV.PROD.DB,
    port: ENV.PROD.PORT,
    user: ENV.PROD.USER,
    password: ENV.PROD.PASSWORD,
    ssl: {
        rejectUnauthorized: ENV.PROD.SSL_REQUIRED
    }
});

const originalQuery = pool.query.bind(pool);
pool.query = (...args) => retry(originalQuery, args);

module.exports = pool;