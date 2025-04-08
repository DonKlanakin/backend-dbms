const fs = require("fs");

const dataSource = "resources/data/user-data.txt";
const dataEncoder = "utf-8";

exports.getAllUsers = () => {
    return fs.readFileSync(dataSource, dataEncoder);
}