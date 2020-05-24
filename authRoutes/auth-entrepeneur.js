const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Entrepeneur = require("../models/entrepeneur-model");
const { validateBody } = require("../validateRoutes/validate-entrepeneur");

// ENTREPENEUR AUTH ROUTES

const route = express.Router();

// POST  /api/auth/register
route.post("/register", validateBody, (req, res) => {
  const credentials = req.body;
  const { username } = req.body;
  Entrepeneur.findBy({ username }).then((user) => {
    if (user) {
      res.status(400).json({ errorMessage: "Username already taken" });
    } else {
      const hash = bcrypt.hashSync(credentials.password, 8);
      credentials.password = hash;
      Entrepeneur.add(credentials)
        .then(([user]) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          res
            .status(500)
            .json({ errorMessage: "there was an error creating account" });
        });
    }
  });
});

// POST  /api/auth/login
route.post("/login", validateBody, (req, res) => {
  const { username, password } = req.body;

  Entrepeneur.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ errorMessage: "Invalid email or password" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "there was an error while logging in" });
    });
});

function createToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWTSECRET, options);
}

module.exports = route;
