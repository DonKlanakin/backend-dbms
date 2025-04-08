const dotenv = require("dotenv");
dotenv.config({ path: "./env/config.env" });

const ENV = {
    DEV: {
        ROOT: process.env.DEV_ROOT,
        PORT: process.env.DEV_PORT,
        HOST: process.env.DEV_HOST
    },
    PROD: {
        ROOT: process.env.PROD_APP_ROOT,
        PORT: process.env.PROD_APP_PORT,
        HOST: process.env.PROD_PGHOST,
        DB: process.env.PROD_PGDATABASE,
        USER: process.env.PROD_PGUSER,
        PASSWORD: process.env.PROD_PGPASSWORD
    }
};

module.exports = ENV;