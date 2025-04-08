const { Pool } = require("pg");
const ENV = require("../env/config");

const pool = new Pool({
    host: ENV.PROD.HOST,
    database: ENV.PROD.DB,
    port: ENV.PROD.PORT,
    user: ENV.PROD.USER,
    password: ENV.PROD.PASSWORD
});

module.exports = pool;