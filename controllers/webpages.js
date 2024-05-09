const { matchedData } = require("express-validator");
const { webpagesModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const mongoose = require("mongoose");

const getItems = async (req, res) => {
  try {
    const { scoring } = req.query;
    let query = webpagesModel.find({});
    if (scoring === "true") {
      query = query.sort({ "datass.Scoring": -1 }); // Asegúrate de que el path al campo 'Scoring' sea correcto
    }
    const data = await query.exec();

    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_GET_ITEMS", 403);
  }
};

const getItem = async (req, res) => {
  try {
    const cif = req.params.id;
    const data = await webpagesModel.findOne({ id: cif });

    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItemsCiudad = async (req, res) => {
  try {
    const ciudad = req.params.ciudad;
    const data = await webpagesModel.find({ ciudad: ciudad });

    const { scoring } = req.query;
    if (scoring === "true") {
      data = data.sort({ "datass.Scoring": -1 }); // Asegúrate de que el path al campo 'Scoring' sea correcto
    }
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const getItemsCiudadActividad = async (req, res) => {
  try {
    const { ciudad, actividad } = req.params;
    const data = await webpagesModel.find({
      ciudad: ciudad,
      actividad: actividad,
    });
    const { scoring } = req.query;
    if (scoring === "true") {
      data = data.sort({ "datass.Scoring": -1 }); // Asegúrate de que el path al campo 'Scoring' sea correcto
    }
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //El dato filtrado por el modelo (probar con body=req)

    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    body.creadorId = dataToken._id; // Asume que '_id' está en el payload del token
    //const userId = req.user._id; // Accediendo al ID del usuario desde req.user

    const data = await webpagesModel.create(body);
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //Extrae el id y el resto lo asigna a la constante body
    const data = await webpagesModel.findByIdAndUpdate(id, body);
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const addScoring = async (req, res) => {
  try {
    const { id } = req.params;
    const scoring = req.body.Scoring;

    console.log(id, scoring);
    const item = await webpagesModel.findById(id);

    const nuevaCantidadVotos = item.datass.num + 1;
    const nuevaMediaValoracion =
      (item.datass.Scoring * item.datass.num + scoring) / nuevaCantidadVotos;

    // Actualiza el documento en la base de datos
    const updatedItem = await webpagesModel.findByIdAndUpdate(
      id,
      {
        "datass.num": nuevaCantidadVotos,
        "datass.Scoring": nuevaMediaValoracion,
      },
      { new: true }
    );

    res.json(updatedItem);
    //res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await webpagesModel.deleteOne({ _id: id }); // "delete" realiza el borrado lógico
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemsCiudad,
  getItemsCiudadActividad,
  addScoring,
};
