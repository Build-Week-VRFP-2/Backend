const router = require('express').Router()
const Inv = require('../models/investor-model')
const {validateInvestorInfo} = require('../validateRoutes/validate-investor')
const objectBuilder = require('./objectBuilder')

//post for new investor
//the front end should consider implementing a way to make sure this gets filled out
router.post('/:authID/info', validateInvestorInfo, (req, res)=>{
    req.body.investor_auth_id = req.params.authID
    Inv.addInvestor(req.body)
        .then(investor=>{
            if(investor){
                res.status(200).json({
                    message: 'successfully added the investor info',
                    inv_id: investor.id
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error adding the new investor to the database',
                error: err
            })
        })
})

//post for contact info
router.post('/:authID/contact', (req,res)=>{
    req.body.investor_id = req.params.authID
    Inv.getContactInfo(req.params.authID)
        .then(response=>{
            if(response){
                res.status(400).json({
                    errorMessage: 'there is already contact info with that authID'
                })
            }else{
                Inv.addContactInfo(req.body)
                    .then(contact=>{
                        if(contact){
                            res.status(200).json({
                                message: 'successfully created contact info'
                            })
                        }       
                     })
                     .catch(err=>{
                        res.status(500).json({
                            message: 'error adding the new contact',
                            error: err
                        })
                     })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error retrieving contact data',
                error: err
            })
        })
})

//get investor info
//will return investor data contacts and saved list
router.get('/:authID/info/:invID', (req,res)=>{
    Inv.getInvestorByID(req.params.invID)
        .then(investor=>{
            if(investor){
                const investorObj = objectBuilder(investor.id)
                res.status(200).json(investorObj)
            }else{
                res.status(404).json({
                    message: 'there is no investor with that id'
                }) 
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error retrieving investor data',
                error: err
            })
        })
})

//get dashboard
router.get('/:authID/dashboard/:invID', (req,res)=>{
    Inv.getDashboard()
        .then(projects=>{
            if(projects){
                res.status(200).json(projects)
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error retrieving dashboard',
                error: err
            })
        })
})

//post for save list
router.post('/:authID/saved/:invID', (req,res)=>{
    const newSaveObj = {
        ...req.body,
        investor_id: req.params.invID
    }
    Inv.saveProject(newSaveObj)
        .then(updatedSavedList=>{
            res.status(200).json({
                message: 'heres your updated saved list',
                saved_projects: updatedSavedList
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error updating saved list',
                error: err
            })
        })
})

//put investor info
//will add validation later
router.put('/:authID/info/:invID', (req,res)=>{
    const changes = req.body
    Inv.updateInvestor(req.params.invID, changes)
        .then(updatedInvestor=>{
            const investorObj = objectBuilder(updatedInvestor.id)
            res.status(200).json(investorObj)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error updating investor data',
                error: err
            })
        })
})

router.put('/:authID/contact', (req, res)=>{
    const changes = req.body
    Inv.updateContactInfo(req.params.authID, changes)
        .then(updatedContact=>{
            res.status(200).json({
                message: 'successfully updated'
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error updating contact data',
                error: err
            })
        })
})

//delete for saved list
router.delete('/:authID/saved/:invID/:saveID', (req,res)=>{
    const removedID = req.params.saveID
    Inv.removeSavedProject(removedID, req.params.invID)
    .then(updatedSavedList=>{
            res.status(200).json({
                message: 'heres your updated saved list',
                saved_projects: updatedSavedList
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error updating saved list',
                error: err
            })
        })
})

module.exports = router