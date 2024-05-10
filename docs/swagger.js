const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "u-tad",
        url: "https://u-tad.com",
        email: "javier.calvo@live.u-tad.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        user: {
          type: "object",
          required: [
            "nombre",
            "email",
            "password",
            "edad",
            "ciudad",
            "intereses",
            
          ],
          properties: {
            nombre: {
              type: "string",
              example: "Javier",
            },
            email: {
              type: "string",
              example: "Javier@aaaaa.com",
            },
            password: {
              type: "string",
            },
            edad: {
              type: "integer",
              example: 20,
            },
            ciudad: {
              type: "string",
              example: "Madrid",
            },
          },
        },
        page: {
          type: "object",
          required: [
            "ciudad",
            "actividad",
            "titulo",
            "resumen",
            "textos",
            "scoring",
            "numPuntuaciones",
            "resenias",
          ],
          properties: {
            ciudad: {
              type: "string",
            },
            actividad: {
              type: "string",
            },
            titulo: {
              type: "string",
            },
            resumen: {
              type: "string",
            },
            textos: {
              type: "string",
            },
            contenido: {
              type: "array",
              items: {
                type: "string",
              },
            },
            scoring: {
              type: "integer",
              example: 2.5,
            },
            numPuntuaciones: {
              type: "integer",
              example: 7,
            },
            resenias: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
