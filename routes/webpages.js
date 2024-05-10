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

router.get("/", getItems);

router.get("/:id", validatorGetItem, getItem);

router.get("/search/:ciudad", validatorGetCiudad, getItemsCiudad);

router.get(
  "/search/:ciudad/:actividad",
  validatorGetCiudad,
  getItemsCiudadActividad
);

//router.post("/", validatorCreateItem, customHeader, createItem)
router.post(
  "/",
  authMiddleware,
  checkRol(["comercio"]),
  validatorCreateItem,
  createItem
);

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
