const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateItem = [
  check("ciudad").exists().notEmpty(), //.isLength(min:5, max:90)
  check("actividad").exists().notEmpty(),
  check("titulo").exists().notEmpty(),
  check("resumen").exists().notEmpty(),
  check("textos").exists().notEmpty(),

  (req, res, next) => validateResults(req, res, next),
];

const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorPutItem = [
  check("ciudad").exists().notEmpty(), //.isLength(min:5, max:90)
  check("role").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem, validatorGetItem, validatorPutItem };
