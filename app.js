const express = require("express");
const ENV = require("./env/config");
const userRoutes = require("./routes/user-routes");
const defaultRoutes = require("./routes/default-routes");
const errorManager = require("./utils/errors-manager");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.all(/./, defaultRoutes);
app.use(errorManager.processDefaultError);

app.listen(ENV.DEV.PORT, async () => {
    console.log(`Server running on ${ ENV.PROD.ROOT }:${ ENV.DEV.PORT }`);
});