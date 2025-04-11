const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/", userController.createUsers);
//router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUserById);

module.exports = router;