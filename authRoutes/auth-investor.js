const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Inv = require("../models/investor-model");
const {validateRegister} = require('../validateRoutes/validate-investor')

// INVESTORS ROUTES

const route = express.Router();

function createToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWTSECRET, options);
}

// POST  /api/auth/investor/register
route.post("/register", validateRegister, (req, res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 8)
    creds.password = hash

    Inv.registerInvestor(creds)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Error creating account',
                error: err
            })
        })
});

// POST  /api/auth/investor/login
route.post("/login", (req, res) => {
    const creds = req.body

    Inv.getAuthBy({username: creds.username})
        .then(user=>{
            if(user && bcrypt.compareSync(creds.password, user.password)){
                const token = createToken(user)
                res.status(200).json({
                    message: 'successfully logged in',
                    token: token,
                    auth_id: user.id
                })
            }else{
                res.status(401).json({
                    message: 'the username or password is incorrect'
                })
            }
        })
});

module.exports = route;