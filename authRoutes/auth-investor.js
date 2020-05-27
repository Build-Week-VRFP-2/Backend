const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Inv = require("../models/investor-model");
const {validateRegister} = require('../validateRoutes/validate-investor')
const objectBuilder = require('../investorRoutes/objectBuilder')

// INVESTORS ROUTES

const route = express.Router();

function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username
    };
    const secret = process.env.JWTSECRET || 'bananas'
    const options = {
      expiresIn: "1h",
    };
        return jwt.sign(payload, secret, options);
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
                Inv.getInvestorBy({investor_auth_id: user.id})
                    .then(async investor=>{
                        const data = await objectBuilder(investor.id)
                        if(investor && data){
                            res.status(200).json({
                                message: 'successfully logged in',
                                token: token,
                                auth_id: user.id,
                                investor_data: data
                            })
                        } 

                    })
                    .catch(err=>{
                        res.status(200).json({
                                message: 'successfully logged in! we did not find any personal or contact information. Please fill out those forms',
                                token: token,
                                auth_id: user.id
                        })
                    })
            }else{
                res.status(401).json({
                    message: 'the username or password is incorrect'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({err})
        })
});

module.exports = route;