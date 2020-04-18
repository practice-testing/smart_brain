const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const port = process.env.PORT || 3000;

const db = knex({
  client: "pg",
  connection: {
    connectString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.json("we are on!!!"));

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.get("/profile/:id", (req, res) => profile.getProfile(req, res, db));

app.put("/image", (req, res) => image.incrementEntries(req, res, db));

app.post("/detectFace", (req, res) => image.callClarifaiApi(req, res));

app.listen(port, console.log("App is running on port ", port));
