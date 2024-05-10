const request = require("supertest");
const app = require("../app");

describe("Pruebas unitarias", () => {
  it("Prueba GET /merchants", async () => {
    const response = await request(app).get("/merchants");
    expect(response.status).toBe(200);
  });

  it("Prueba GET /webpages", async () => {
    const response = await request(app).get("/webpages");
    expect(response.status).toBe(200);
    // Agrega más expectativas para verificar los resultados de la respuesta
  });

  var token = "";
  var id = "";

  it("should register a user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "Menganito",
        age: 20,
        email: "user25@test.com",
        password: "HolaMundo.01",
      })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body.user.email).toEqual("user25@test.com");
    expect(response.body.user.role).toEqual("user");
    token = response.body.token;
    id = response.body.user._id;
  });

  it("should delete a user", async () => {
    const response = await request(app)
      .delete("/auth/" + id)
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body.acknowledged).toEqual(true);
  });

  // Agrega más expectativas para verificar los resultados de la respuesta
});
