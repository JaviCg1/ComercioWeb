const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express(); //Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors());
app.use(express.json());
const morganBody = require("morgan-body");
const { IncomingWebhook } = require("@slack/webhook");
const loggerStream = require("./utils/handleLogger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");

morganBody(app, {
  noColors: true, // Limpiamos el string de datos lo máximo posible antes de mandarlo a Slack
  skip: function (req, res) {
    // Solo enviamos errores (4XX de cliente y 5XX de servidor)
    return res.statusCode < 400;
  },
  stream: loggerStream, // Usamos nuestro loggerStream personalizado como salida
});

app.use("/", require("./routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const dbConnect = require("./config/mongo");
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto " + port);
});

dbConnect();
