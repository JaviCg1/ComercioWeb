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

router.get("/", getItems);

router.get("/:cif", getItem);

router.post(
  "/create",
  validatorCreateItem,
  authMiddleware,
  checkRol(["admin"]),
  createItem
);

router.put("/update/:cif", validatorCreateItem, updateItem);
router.delete("/delete/:cif", deleteItem);

module.exports = router;
