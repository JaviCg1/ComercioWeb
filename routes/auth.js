const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const router = express.Router();
const { checkCreator, authMiddleware } = require("../middleware/session");
const { getItems } = require("../controllers/users");

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - User
 *     summary: "User register"
 *     description: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/user"
 *     responses:
 *       '200':
 *         description: Returns the inserted object
 *       '401':
 *         description: Validation error
 *     security:
 *       - bearerAuth: []
 */
router.post("/register", validatorRegister, registerCtrl);
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - User
 *     summary: "Login user"
 *     description: "Authenticate a user and return a token"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/login"
 *     responses:
 *       '200':
 *         description: "Returns the user object and token"
 *       '401':
 *         description: "Validation error or bad credentials"
 *     security:
 *       - bearerAuth: []
 */
router.post("/login", validatorLogin, loginCtrl);

router.get("/", authMiddleware, getItems);

module.exports = router;
