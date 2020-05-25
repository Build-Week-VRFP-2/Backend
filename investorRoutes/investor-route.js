const router = require('express').Router()
const Inv = require('../models/investor-model')
const {validateInvestorInfo} = require('../validateRoutes/validate-investor')

//post for new investor
//the front end should consider implementing a way to make sure this gets filled out
router.post('/', validateInvestorInfo, (req, res)=>{
    Inv.addInvestor(req.body)
        .then(investor=>{
            if(investor){
                Inv.getSavedProjects(investor.id)
                    .then(saved=>{
                        const investorObj = {
                            ...investor,
                            saved_projects: saved
                        }
                        res.status(200).json(investorObj)
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'error retrieving saved posts',
                            error: err
                        })
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

//get investor info
router.get('/:invID', (req,res)=>{
    Inv.getInvestorByID(req.params.invID)
        .then(investor=>{
            if(investor){
                Inv.getSavedProjects(req.params.invID)
                    .then(saved=>{
                        const investorObj = {
                            ...investor,
                            saved_projects: saved
                        }
                        res.status(200).json(investorObj)
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'error retrieving saved posts',
                            error: err
                        })
                    })
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
router.get('/:invID/dashboard', (req,res)=>{
    Inv.getDashboard(req.params.invID)
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
router.post('/:invID/saved', (req,res)=>{
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
router.put('/:invID', (req,res)=>{
    const changes = req.body
    Inv.updateInvestor(req.params.invID, changes)
        .then(updatedInvestor=>{
            res.status(200).json(updatedInvestor)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error updating saved list',
                error: err
            })
        })
})

//delete for saved list
router.delete('/:invID/saved', (req,res)=>{
    const removedID = req.body.saveID
    Inv.removeSavedProject(removedID, req.params.id)
})

module.exports = router