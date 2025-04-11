const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();
router.post("/", userController.createUsers);
router.get("/", userController.getAllUsers);

module.exports = router;