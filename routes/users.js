const express = require("express");
const router = express.Router();

const { createItem, getItems, getItem } = require("../controllers/users");

router.get("/", getItems);
//router.post("/", createItem);
//router.post("/update/:cif", validatorCreateItem, updateItem);
module.exports = router;
