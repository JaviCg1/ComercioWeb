const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const { getItems } = require("../controllers/users");

router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);

router.get("/", authMiddleware, getItems);

module.exports = router;
