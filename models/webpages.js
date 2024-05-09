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

    creadorId: {
      type: String,
    },

    datass: {
      Scoring: {
        type: Number,
        default: 0,
      },
      num: {
        type: Number,
        default: 0,
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
