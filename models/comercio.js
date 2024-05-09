const mongoose = require("mongoose");

const ComercioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cif: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    direccion: {
      type: String,
      // TODO: Guardaremos el hash
    },
    telefono: {
      type: String,
      // TODO: Guardaremos el hash
    },
    id: {
      type: Number,
      // TODO: Guardaremos el hash
    },
    role: {
      type: String,
      default: "comercio", // Asigna "comercio" como valor predeterminado para todos los documentos
    },
  },
  {
    timestamps: true, // Añade automáticamente campos createdAt y updatedAt
    versionKey: false, // Evita que se cree el campo __v para control de versiones
  }
);

module.exports = mongoose.model("comercios", ComercioSchema); // “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)
