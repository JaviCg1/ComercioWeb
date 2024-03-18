const { matchedData } = require("express-validator");
const { comerModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    const ordenarPorCif = req.query.ordenarPorCif === "true";
    let query = comerModel.find({});
    if (ordenarPorCif) {
      query = query.sort({ cif: "asc" });
    }
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
    const data = await comerModel.findOne({ cif: cif });

    res.send(data);
  } catch (err) {}
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //El dato filtrado por el modelo (probar con body=req)

    const data = await comerModel.create(body);
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //Extrae el id y el resto lo asigna a la constante body
    const data = await usersModel.findByIdAndUpdate(id, body);
    res.send(data);
  } catch (err) {
    //console.log(err)
  }
};

const deleteItem = async (req, res) => {
  try {
    const { cif } = req.params;
    const { tipo } = req.query; // "logico" o "fisico"

    if (tipo === "logico") {
      // Borrado lógico: marcar el comercio como eliminado
      await Comercio.updateOne({ cif }, { isDeleted: true });
    } else if (tipo === "fisico") {
      // Borrado físico: eliminar el comercio de la base de datos
      await Comercio.deleteOne({ cif });
    }

    res.send({
      message: `Comercio con CIF ${cif} borrado ${
        tipo === "logico" ? "lógicamente" : "físicamente"
      }.`,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al borrar el comercio", error: error.message });
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
