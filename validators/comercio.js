const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const validatorCreateItem = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("El campo 'name' es obligatorio")
    .isString()
    .withMessage("El 'name' debe ser un texto"),
  check("cif")
    .exists({ checkFalsy: true })
    .withMessage("El campo 'cif' es obligatorio")
    .isString()
    .withMessage("El 'cif' debe ser un texto"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("El campo 'email' es obligatorio")
    .isEmail()
    .withMessage("El 'email' debe ser un email válido"),
  check("direccion")
    .exists({ checkFalsy: true })
    .withMessage("El campo 'direccion' es obligatorio"),
  check("telefono")
    .exists({ checkFalsy: true })
    .withMessage("El campo 'telefono' es obligatorio")
    .isString()
    .withMessage("El 'telefono' debe ser un texto"),

  (req, res, next) => validateResults(req, res, next),
];
module.exports = { validatorCreateItem };
