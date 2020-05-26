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

function validateAuthID(req, res, next){
    const id = req.params.authID
    Inv.getAuthBy({id: id})
        .then(user=>{
            if(user){
                next()
            }else{
                res.status(401).json({ errorMessage: "There is no user with that auth_id" })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'server error please try again',
                error: err
            })
        })
}

function checkContactInfo(req, res, next){
    
}

function validateInvestorInfo(req, res, next){
    const investor_auth_id = req.params.authID
    const {name, description, city, state, offers_capital, offers_resources, offers_mentorship} = req.body

    //first make sure the required fields are there
    if(!name || !description || !city || !state || !investor_auth_id || typeof offers_capital === 'undefined' || typeof offers_resources === 'undefined' || typeof offers_mentorship === 'undefined'){
        res.status(400).json({ errorMessage: "Please make sure all the required fields are filled out" })
    }else{
        if(offers_capital === false && offers_resources === false && offers_mentorship === false){
            res.status(400).json({
                errorMessage: 'at least one of your offerings needs to be true'
            })
        }else{
            //then check that the auth ID is valid
            Inv.getAuthBy({id: investor_auth_id})
                .then(user=>{
                    if(!user){
                        res.status(401).json({ errorMessage: "Invalid authID" })
                    }else{
                        //converts the offerings to binary for storage
                        const offerings_array = [offers_capital, offers_resources, offers_mentorship]
                        offerings_array.forEach(offering=>{
                            if(offering === false){
                                offering = 0
                            }else if(offering === true){
                                offering = 1
                            }else{
                                res.status(400).json({
                                    errorMessage: 'your offerings must be sent in the form of booleans'
                                })
                            }
                        })
                        req.body.offers_capital = offers_capital
                        req.body.offers_resources = offers_resources
                        req.body.offers_mentorship = offers_mentorship
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
}