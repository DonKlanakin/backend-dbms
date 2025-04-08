const express = require("express");
const ENV = require("./env/config");
const userRoutes = require("./routes/user-routes");

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

app.listen(ENV.PROD.PORT, () => {
    console.log(`Server running on ${ ENV.PROD.ROOT }:${ ENV.PROD.PORT }`);
});