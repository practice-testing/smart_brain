const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "3269ca8a3f16457991d543f98dcb2b34",
});

const callClarifaiApi = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((response) => res.json(response))
    .catch((err) => res.json("error indentifying face"));
};

const incrementEntries = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .increment("entries", 1)
    .where({ id })
    .returning("entries")
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = { incrementEntries,callClarifaiApi };
