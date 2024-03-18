const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // TODO: Guardaremos el hash
    },
    role: {
      type: String,
      enum: ["user", "admin"], // es el enum de SQL
      default: "user",
    },
  },
  {
    timestamps: true, // Añade automáticamente campos createdAt y updatedAt
    versionKey: false, // Evita que se cree el campo __v para control de versiones
  }
);

module.exports = mongoose.model("users", UserSchema); // “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)
