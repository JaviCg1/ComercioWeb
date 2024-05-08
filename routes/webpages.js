const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/webpages");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/webpages");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem);

//router.post("/", validatorCreateItem, customHeader, createItem)
router.post(
  "/",
  authMiddleware,
  checkRol(["user", "admin"]),
  validatorCreateItem,
  createItem
);

router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);

router.delete("/:id", validatorGetItem, deleteItem);

/* router.get("/", (req, res) => {
    const data = ["tracks"]
    res.send(data)
}) */

module.exports = router;
