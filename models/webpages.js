const mongoose = require("mongoose");

const WebPagesScheme = new mongoose.Schema(
  {
    ciudad: {
      type: String,
    },
    actividad: {
      type: String,
    },
    titulo: {
      type: String,
    },
    resumen: {
      type: String,
    },
    textos: {
      type: String,
    },

    datass: {
      Scoring: {
        type: String,
      },
      num: {
        type: String,
      },
      reviews: {
        type: String,
      },
    },
  },
  {
    timestamp: true, // TODO createdAt, updatedAt
    versionKey: false,
  }
);

module.exports = mongoose.model("webpages", WebPagesScheme); // Nombre de la colección (o de la tabla en SQL)
