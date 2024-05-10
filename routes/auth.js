const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const router = express.Router();
const { checkUser, authMiddleware } = require("../middleware/session");
const { getItems, updateItem, deleteItem } = require("../controllers/users");

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

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Items
 *     summary: Retrieve all items
 *     description: Fetches a list of all available items, requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved items.
 *       '401':
 *         description: Unauthorized - User not authenticated.
 */

router.get("/", authMiddleware, checkUser, getItems);

/**
 * @openapi
 * /auth/{id}:
 *   put:
 *     tags:
 *       - Items
 *     summary: Update an item
 *     description: Updates details of an existing item by ID, requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Item updated successfully.
 *       '401':
 *         description: Unauthorized - User not authenticated.
 *       '404':
 *         description: Not found - Item does not exist.
 */

router.put("/:id", authMiddleware, checkUser, updateItem);

/**
 * @openapi
 * /auth/{id}:
 *   delete:
 *     tags:
 *       - Items
 *     summary: Delete an item
 *     description: Permanently deletes an item by its ID, requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the item to delete
 *     responses:
 *       '200':
 *         description: Item deleted successfully.
 *       '401':
 *         description: Unauthorized - User not authenticated.
 *       '404':
 *         description: Not found - Item does not exist.
 */
router.delete("/:id", authMiddleware, checkUser, deleteItem);

module.exports = router;
