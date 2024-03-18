const express = require("express");
const router = express.Router();
const { createItem, getItems, getItem } = require("../controllers/users");
const { validatorCreateItem } = require("../validators/comercio");

router.get("/a", (req, res) => {
  const data = ["hola", "mundo", "comercio"];
  res.send({ data });
});

router.get("/", getItems);
router.post("/crear1", createItem);
router.get("/:cif", getItem);
router.post("/crear", validatorCreateItem, createItem);

module.exports = router;
