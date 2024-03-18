const express = require("express");
const router = express.Router();

const { createItem, getItems, getItem } = require("../controllers/users");

router.get("/", (req, res) => {
  const data = ["hola", "mundo", "uusers"];

  res.send({ data });
});

router.get("/u", getItems);
router.post("/usuarios", createItem);
module.exports = router;
