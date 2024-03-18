const mongoose = require("mongoose");

const dbConnect = () => {
  const db_uri = process.env.DB_URI;
  mongoose.set("strictQuery", false);

  try {
    mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error conectando a la BD:", error);
  }

  // Listen events
  mongoose.connection.on("connected", () => console.log("Conectado a la BD"));
};

module.exports = dbConnect;
