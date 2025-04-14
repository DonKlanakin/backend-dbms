const express = require("express");
const defaultController = require("../controllers/default-controller");

const router = express.Router();
router.all(/./, defaultController.displayPathNotFound);

module.exports = router;