const express = require("express");
const ENV = require("./env/config");
const userRoutes = require("./routes/user-routes");
const pool = require("./db/pool");

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

app.listen(ENV.DEV.PORT, async () => {
    console.log(`Server running on ${ ENV.PROD.ROOT }:${ ENV.DEV.PORT }`);
});