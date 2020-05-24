const db = require("../data/config-db");

module.exports = {
    getAuthBy,
    registerInvestor,
    addInvestor,
    updateInvestor,
    getInvestorByID,
    getDashboard,
    saveProject,
    getSavedProjects,
    removeSavedProject,
}

//just used for auth validation
function getAuthBy(param){
    return db('investor_auth as i').where(param).select('i.username').first()
}

//takes a username and password for a new account
//posts to the investor_auth table
//returns a call to the db for the new user
function registerInvestor(authInfo){
    return db('investor_auth').insert(authInfo, 'id')
        .then(([id])=>{
            return db('investor_auth as i').where({id}).select('i.id', 'i.username').first()
        })
}

//takes the info for the new investor
//posts to the investors table
//returns a call to the db for the investor data
function addInvestor(invData){
    return db('investors').insert(invData, 'id')
        .then(([id])=>{
            return db('investors').where({id}).first()
        })
}

function updateInvestor(invID, changes){
    return db('investors as i').where({id: invID}).update(changes)
        .then(response=>{
            return getInvestorByID(invID)
        })
}

function getInvestorByID(id){
    return db('investors as i').where({id}).select('i.id', 'i.name', 'i.description', 'i.city', 'i.state').first()
}

//will add functionality to filter results after everything else is done
function getDashboard(){
    return db('applicants as a').select('a.id', 'a.name', 'a.description', 'a.city', 'a.state')
}

function saveProject(saveData){
    return db('saved').insert(saveData, 'id')
}

function getSavedProjects(invID){
    return db('saved as s').where({investor_id: invID})
        .join('applicants as a', 's.applicant_id', '=', 'a.id')
        .select('a.id', 'a.name', 'a.description', 'a.city', 'a.state')
        
}

function removeSavedProject(saveID, invID){
    return db('saved').where({id: saveID}).del()
        .then(response=>{
            return getSavedProjects(invID)
        })
}


