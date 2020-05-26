const db = require("../data/config-db");

module.exports = {
    registerInvestor,
    getAuthBy,
    addInvestor,
    updateInvestor,
    getInvestorBy,
    getInvestorByID,
    getDashboard,
    saveProject,
    getSavedProjects,
    removeSavedProject,
    addContactInfo,
    getContactInfo,
    updateContactInfo,
}

function registerInvestor(authInfo){
    return db('investor_auth').insert(authInfo, 'id')
        .then(([id])=>{
            return db('investor_auth as i').where({id}).select('i.id as auth_id', 'i.username').first()
        })
}

function getAuthBy(param){
    return db('investor_auth as i').where(param).select('i.id', 'i.username').first()
}



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

function getInvestorBy(param){
    return db('investor as i').where(param).first()
}

function getInvestorByID(id){
    return db('investors as i').where({id}).first()
}

//will add functionality to filter results after everything else is done
function getDashboard(){
    return db('applicants as a')
    .join('applicant_contact_info as c', 'a.applicant_auth_id', '=', 'c.applicant_id' )
    .select('a.id', 'a.name', 'a.description', 'a.city', 'a.state', 'c.email', 'c.phone_number', 'c.address', 'a.needs_capital', 'a.needs_resources', 'a.needs_mentorship', )
}

function saveProject(saveData){
    return db('saved').insert(saveData, 'id')
        .then(response=>{
            return getSavedProjects(saveData.investor_id)
        })
}

function getSavedProjects(invID){
    return db('saved as s').where({investor_id: invID})
        .join('applicants as a', 's.applicant_id', '=', 'a.id')
        .join('applicant_contact_info as c', 'a.applicant_auth_id', '=', 'c.applicant_id' )
        .select('s.id', 's.applicant_id', 'a.name', 'a.description', 'a.city', 'a.state', 'c.email', 'c.phone_number', 'c.address', 'a.needs_capital', 'a.needs_resources', 'a.needs_mentorship')
}

function removeSavedProject(saveID, invID){
    return db('saved').where({id: saveID}).del()
        .then(response=>{
            return getSavedProjects(invID)
        })
}

function addContactInfo(info){
    return db('investor_contact_info as c').insert(info)
        .then(response =>{
            return getContactInfo(info.investor_id)
        })
}

function getContactInfo(authID){
    return db('investor_contact_info as c').where({investor_id: authID}).first()
}

function updateContactInfo(authID, changes){
    return db('investor_contact_info as c').where({investor_id: authID}).update(changes)
        .then(response=>{
            return getContactInfo(authID)
        })
}


