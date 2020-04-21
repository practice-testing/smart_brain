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
    host:`ec2-34-197-212-240.compute-1.amazonaws.com`,
    user:`ukwazrpgjwvfwz`,
    password:`374c343e2be3beb4de442c1452feb35d0eb8385e0b83ce840d6ffcde1c89edbb`,
    database:`ddni6317ipblh8`,
    ssl: true,
    port:`5432`
  },
});

const app = express();

console.log(process.env.DATABASE_URL);

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
