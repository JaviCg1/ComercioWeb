const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
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
      type: String, // TODO Guardaremos el hash
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // es como el enum de SQL
      default: "user",
    },
  },
  {
    timestamp: true, // TODO createdAt, updatedAt
    versionKey: false,
  }
);

module.exports = mongoose.model("users", UserScheme); // Nombre de la colección (o de la tabla en SQL)
