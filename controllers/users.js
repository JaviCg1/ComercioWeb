const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    let query = userModel.find({});

    const data = await query.exec();
    console.log(data);
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEMS", 403);
  }
};

const getItem = async (req, res) => {
  try {
    const cif = req.params.cif;
    const data = await userModel.findOne({ cif: cif });

    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //El dato filtrado por el modelo (probar con body=req)

    const data = await userModel.create(body);
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { cif } = req.params;
    const body = req.body;
    console.log(body);
    const comercio = await userModel.findOneAndUpdate({ cif: cif }, body, {
      new: true,
      runValidators: true,
    });

    if (!comercio) {
      return res.status(404).send({
        message: "No se encontró un comercio con el CIF proporcionado.",
      });
    }
    res.send(comercio);
  } catch (err) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.query; // "logico" o "fisico"

    // Borrado físico: eliminar el comercio de la base de datos
    const comercio = userModel.deleteOne({ _id: id });

    res.send({
      message: `Usuario con ID ${id} borrado ${
        tipo === "logico" ? "lógicamente" : "físicamente"
      }.`,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
