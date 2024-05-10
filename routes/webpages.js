const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemsCiudad,
  getItemsCiudadActividad,
  addScoring,
} = require("../controllers/webpages");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorGetCiudad,
  validatorGetScoring,
} = require("../validators/webpages");
const customHeader = require("../middleware/customHeader");
const { checkCreator, authMiddleware } = require("../middleware/session");
const checkRol = require("../middleware/rol");
/**
 * @openapi
 * /webpages/:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get All Items
 *     description: Retrieve a list of all items.
 *     responses:
 *       '200':
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/page"
 */
router.get("/", getItems);

/**
 * @openapi
 * /webpages/{id}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get Item by ID
 *     description: Retrieve a specific item by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Item with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/page"
 *       '404':
 *         description: Not Found - Item with the given ID not found
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * @openapi
 * /webpages/search/{ciudad}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get Items by City
 *     description: Retrieve items based on the specified city.
 *     parameters:
 *       - name: ciudad
 *         in: path
 *         required: true
 *         description: The city to filter items by
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of items in the specified city
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/page"
 */

router.get("/search/:ciudad", validatorGetCiudad, getItemsCiudad);

/**
 * @openapi
 * /webpages/search/{ciudad}/{actividad}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get Items by City and Activity
 *     description: Retrieve items based on the specified city and activity.
 *     parameters:
 *       - name: ciudad
 *         in: path
 *         required: true
 *         description: The city to filter items by
 *         schema:
 *           type: string
 *       - name: actividad
 *         in: path
 *         required: true
 *         description: The activity to filter items by
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of items in the specified city and activity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/page"
 */
router.get(
  "/search/:ciudad/:actividad",
  validatorGetCiudad,
  getItemsCiudadActividad
);

/**
 * @openapi
 * /webpages/:
 *   post:
 *     tags:
 *       - Items
 *     summary: Create Item
 *     description: Create a new item.
 *     security:
 *       - bearerAuth: []  # Assuming authentication using Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/page"
 *     responses:
 *       '201':
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/page"  # Assuming an Item schema exists
 *       '400':
 *         description: Bad request - Validation error
 *       '401':
 *         description: Unauthorized - Access denied due to missing or invalid credentials
 *       '403':
 *         description: Forbidden - User does not have permission to create items
 */
router.post(
  "/",
  authMiddleware,
  checkRol(["comercio"]),
  validatorCreateItem,
  createItem
);
/**
 * @openapi
 * /webpages/score/{id}:
 *   post:
 *     tags:
 *       - Score
 *     summary: Update Score
 *     description: Update an existing score with a given ID.
 *     security:
 *       - bearerAuth: []  # Assuming authentication using Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Score"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the score to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Score updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Score"  # Assuming a Score schema exists
 *       '400':
 *         description: Bad request - Validation error
 *       '401':
 *         description: Unauthorized - Access denied due to missing or invalid credentials
 *       '403':
 *         description: Forbidden - User does not have permission to update the score
 *       '404':
 *         description: Not Found - Score with the given ID not found
 */

router.post(
  "/Score/:id",
  validatorGetScoring,
  authMiddleware,
  checkRol(["user", "admin"]),
  addScoring
);

router.put(
  "/:id",
  checkCreator,
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

router.delete(
  "/:id",
  checkCreator,
  authMiddleware,
  validatorGetItem,
  deleteItem
);

module.exports = router;
