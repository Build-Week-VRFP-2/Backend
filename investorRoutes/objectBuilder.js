//takes an investor ID and builds an object with the necessary data
/*

    example: 
    {
        investor_id: 1,
        name: 'example name',
        description: 'example description',       
        auth_id: 1,
        contactInfo: {
                        email: 'example@email.com',
                        phone: 3033033003,
                        address: 'example address'
                     },
        offerings: ['capital', 'mentorship', 'resources'],
        saved_projects: [
                        {project 1},
                        {project 2},
                        {project 3}
                     ]
    }

*/
const Inv = require('../models/investor-model')

module.exports = async function objectBuilder(invID){

    const investorData = await Inv.getInvestorByID(invID)
    const contactInfo = await Inv.getContactInfo(investorData.investor_auth_id)
    const savedProjects = await Inv.getSavedProjects(invID)
    
    const newObject = {
        id: investorData.id,
        name: investorData.name,
        description: investorData.description,
        auth_id: investorData.investor_auth_id,
        contact_info: contactInfo,
        offerings: offeringsBuilder(investorData.offers_capital, investorData.offers_resources, investorData.offers_mentorship),
        saved_projects: savedProjects
    }
    return newObject
}

function offeringsBuilder(c, r, m){
    const verify = [c, r, m]
    console.log(verify)
    let send = ['capital', 'resources', 'mentorship']
    verify.map((offering, i)=>{
        if(offering === 0){
            console.log(i, 'is false')
            send.splice(i,1)
        }
    })
    console.log(send)
    if(send.length>0){
        return send
    }else{
        return verify
    }
}