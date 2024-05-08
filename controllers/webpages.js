const { matchedData } = require("express-validator");
const { webpagesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    let query = webpagesModel.find({});

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
    const data = await webpagesModel.findOne({ cif: cif });

    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //El dato filtrado por el modelo (probar con body=req)

    const data = await webpagesModel.create(body);
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //Extrae el id y el resto lo asigna a la constante body
    const data = await tracksModel.findByIdAndUpdate(id, body);
    res.send(data);
  } catch (err) {
    //console.log(err)
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await tracksModel.delete({ _id: id }); // "delete" realiza el borrado lógico
    res.send(data);
  } catch (err) {
    //console.log(err)
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
