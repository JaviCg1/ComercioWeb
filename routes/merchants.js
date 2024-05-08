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

router.get("/a", (req, res) => {
  const data = ["hola", "mundo", "comercio"];
  res.send({ data });
});

router.get("/", getItems);
router.post("/crear1", createItem);
router.get("/:cif", getItem);
router.post("/create", validatorCreateItem, createItem);
router.put("/update/:cif", validatorCreateItem, updateItem);
router.delete("/delete/:cif", deleteItem);

module.exports = router;
