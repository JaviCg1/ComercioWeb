const { matchedData } = require("express-validator");
const { comerModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJwt");

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
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //El dato filtrado por el modelo (probar con body=req)

    const dataUser = await comerModel.create(body);

    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
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
    const comercio = await comerModel.findOneAndUpdate({ cif: cif }, body, {
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
    const { cif } = req.params;
    const { tipo } = req.query; // "logico" o "fisico"

    if (tipo === "logico") {
      // Borrado lógico: marcar el comercio como eliminado
      await comerModel.updateOne({ cif }, { isDeleted: true });
    } else if (tipo === "fisico") {
      // Borrado físico: eliminar el comercio de la base de datos
      await comerModel.deleteOne({ cif });
    }

    res.send({
      message: `Comercio con CIF ${cif} borrado ${
        tipo === "logico" ? "lógicamente" : "físicamente"
      }.`,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
