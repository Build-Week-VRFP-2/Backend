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
    const offerings = await Inv.getOfferings(invID)
    const savedProjects = await Inv.getSavedProjects(invID)
    
    const newObject = {
        ...investorData,
        contact_info: contactInfo,
        offerings: offerings,
        saved_projects: savedProjects
    }

    return newObject
}