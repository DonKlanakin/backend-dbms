const fs = require("fs");

const dataSource = "resources/user-data.txt";
const dataEncoder = "utf-8";

exports.getAllUsers = () => {
    return fs.readFileSync(dataSource, dataEncoder);
}