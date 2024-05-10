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
 *     summary: Retrieve items by city
 *     description: Fetches items based on the city they are associated with.
 *     parameters:
 *       - in: path
 *         name: ciudad
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the city to search for items
 *     responses:
 *       '200':
 *         description: Successfully retrieved items for the specified city.
 *       '404':
 *         description: No items found for the specified city.
 */

router.get("/search/:ciudad", validatorGetCiudad, getItemsCiudad);

/**
 * @openapi
 * /webpages/search/{ciudad}/{actividad}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Retrieve items by city and activity
 *     description: Fetches items based on both city and activity.
 *     parameters:
 *       - in: path
 *         name: ciudad
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: actividad
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved items.
 *       '404':
 *         description: No items found matching the criteria.
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
 *     summary: Create a new item
 *     description: Adds a new item to the database, accessible only to users with 'comercio' role.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/page'
 *     responses:
 *       '201':
 *         description: Item created successfully.
 *       '403':
 *         description: Forbidden - User not authorized.
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
 * /webpages/Score/{id}:
 *   post:
 *     tags:
 *       - Items
 *     summary: Add or update scoring
 *     description: Allows adding or updating scoring for an item, accessible to 'user' and 'admin'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Scoring added or updated successfully.
 *       '403':
 *         description: Forbidden - User not authorized.
 */
router.post(
  "/Score/:id",
  validatorGetScoring,
  authMiddleware,
  checkRol(["user", "admin"]),
  addScoring
);

/**
 * @openapi
 * /webpages/{id}:
 *   put:
 *     tags:
 *       - Resources
 *     summary: Update resource details
 *     description: Allows the creator to update a resource by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the resource.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               details: { type: string }
 *     responses:
 *       '200':
 *         description: Resource updated successfully.
 *       '404':
 *         description: Resource not found.
 */

router.put(
  "/:id",
  checkCreator,
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

/**
 * @openapi
 * /webpages/{id}:
 *   delete:
 *     tags:
 *       - Resources
 *     summary: Delete a resource
 *     description: Allows the creator to delete a resource by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the resource to delete.
 *     responses:
 *       '200':
 *         description: Resource deleted successfully.
 *       '404':
 *         description: Resource not found.
 */

router.delete(
  "/:id",
  checkCreator,
  authMiddleware,
  validatorGetItem,
  deleteItem
);

module.exports = router;
