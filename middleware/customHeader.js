const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "Api-publica-123") {
      //Probar con otra para ver el error
      next();
    } else {
      res.status(403).send("api key no es correcto");
    }
  } catch (err) {
    res.status(403).send(err);
  }
};
module.exports = customHeader;
