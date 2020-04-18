const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  db("login")
    .select("email", "hash")
    .where({ email })
    .then((data) => {
      if (data.length) {
        if (bcrypt.compareSync(password, data[0].hash)) {
          return db("users")
            .select("*")
            .where({ email })
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("error getting user"));
        } else res.status(400).json("wrong credentials");
      } else res.status(400).json("wrong credentials");
    })
    .catch((err) => res.status(400).json("error connecting login"));
};

module.exports = {
  handleSignin: handleSignin,
};
