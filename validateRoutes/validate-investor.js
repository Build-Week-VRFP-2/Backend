const db = require("../data/config-db");
const Inv = require('../models/investor-model')

module.exports = {
    validateRegister,
    validateInvestorInfo
}

function validateRegister(req, res, next) {
    const auth = req.body;
    if (!auth.username || !auth.password) {
      res.status(400).json({ errorMessage: "Please enter username and password" });
    } else {
        Inv.getAuthBy({username: auth.username})
            .then(user=>{
                if(user){
                    res.status(401).json({ errorMessage: "That username is taken" })
                }else{
                    next()
                } 
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'server error please try again',
                    error: err
                })
            })
    }
}

function validateInvestorInfo(req, res, next){
    const {name, description, city, state, investor_auth_id} = req.body
    //first make sure the required fields are there
    if(!name || !description || !city || !state || !investor_auth_id){
        res.status(400).json({ errorMessage: "Please make sure all the required fields are filled out" })
    }else{
        //then check that the auth ID is valid
        Inv.getAuthBy({id: investor_auth_id})
            .then(user=>{
                if(!user){
                    res.status(401).json({ errorMessage: "Invalid authID" })
                }else{
                    next()
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'server error please try again',
                    error: err
                })
            })
    }
}