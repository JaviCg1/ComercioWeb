const { checkCreator, authMiddleware } = require("../middleware/session");
const checkRol = require("../middleware/rol");
const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/comercio");
const { validatorCreateItem } = require("../validators/comercio");

/**
 * @openapi
 *
 * /merchants/:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get All Workouts
 *     description: Retrieve a list of all available workouts.
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 */
router.get("/", getItems);

/**
 * @openapi
 * /merchants/{cif}:
 *   get:
 *     tags:
 *       - Merchants
 *     summary: Retrieve a merchant by CIF
 *     description: Fetches details of a merchant specified by the CIF.
 *     parameters:
 *       - in: path
 *         name: cif
 *         required: true
 *         schema:
 *           type: string
 *         description: CIF of the merchant to retrieve
 *     responses:
 *       '200':
 *         description: Merchant retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cif:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *       '404':
 *         description: Merchant not found
 */

router.get("/:cif", getItem);

/**
 * @openapi
 * /merchants/create:
 *   post:
 *     tags:
 *       - Merchants
 *     summary: Create a new merchant
 *     description: Allows administrators to create a new merchant entry.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Merchant created successfully.
 *       '401':
 *         description: Unauthorized access.
 */
router.post(
  "/create",
  validatorCreateItem,
  authMiddleware,
  checkRol(["admin"]),
  createItem
);

/**
 * @openapi
 * /merchants/update/{cif}:
 *   put:
 *     tags:
 *       - Merchants
 *     summary: Update a merchant
 *     description: Updates specific details of an existing merchant by CIF.
 *     parameters:
 *       - in: path
 *         name: cif
 *         required: true
 *         schema:
 *           type: string
 *         description: CIF of the merchant to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Merchant updated successfully.
 *       '404':
 *         description: Merchant not found.
 */
router.put("/update/:cif", validatorCreateItem, updateItem);
/**
 * @openapi
 * /merchants/delete/{cif}:
 *   delete:
 *     tags:
 *       - Merchants
 *     summary: Delete a merchant
 *     description: Permanently deletes a merchant by CIF.
 *     parameters:
 *       - in: path
 *         name: cif
 *         required: true
 *         schema:
 *           type: string
 *         description: CIF of the merchant to be deleted.
 *     responses:
 *       '200':
 *         description: Merchant deleted successfully.
 *       '404':
 *         description: Merchant not found.
 */
router.delete("/delete/:cif", deleteItem);

module.exports = router;
