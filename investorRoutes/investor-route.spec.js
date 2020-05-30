const request = require('supertest')
const server = require('../api/server')
const db = require('../data/config-db')

/*~~~~~~~~~~~~~~~~test~data~~~~~~~~~~~~~~~~*/
const goodAuth = {
	                "username": "Goodboy",
	                "password": "testPassword"
                }

const goodInfo = {
                    "name": "steve",
                    "description": "I am steve",
                    "city": "portland",
                    "state": "or",
                    "offers_capital": true,
                    "offers_resources": true,
                    "offers_mentorship": false
                }

const goodContact = {
                    "email": "example@email.com",
                    "phone_number": 3033033003,
                    "address": "van down by the river"
                    }

const goodSave = {
                    "applicant_id": 2
                }


/*~~~~~~~~~~~~~~~~resets the tables~~~~~~~~~~~~~~~~*/
afterEach(async () => {
    await db("investor_auth").truncate()
    await db("investor_contact_info").truncate()
    await db("investors").truncate()

});

/*~~~~~~~~~~~~~~~~full~flow~for~reuse~~~~~~~~~~~~~~~~*/
async function createNewInvestor(){
    await request(server)
            .post('/api/auth/investor/register')
            .send(goodAuth)
            

    const logRes = await request(server)
            .post('/api/auth/investor/login')
            .send(goodAuth)
            

    const token = logRes.body.token

    await request(server)
            .post(`/api/investor/1/info`)
            .send(goodInfo).set('authorization', `${token}`)
            

    await request(server)
            .post(`/api/investor/1/contact`)
            .send(goodContact).set('authorization', `${token}`)

    await request(server).post('/api/investor/1/saved/1')
            .send(goodSave)
            .set('authorization', `${token}`)
        
    const getInfo = await request(server).get('/api/investor/1/info/1')
            .set('authorization', `${token}`)

        
    return({
        token: token,
        ...getInfo.body.investor
    })
}

describe("testing the testing", ()=>{
    it('testing if jest is working', ()=>{
        expect(2).toBe(2)
    })
})

describe('Can go through the flow of register, login, and fill out investor data', ()=>{

    it('register works', ()=>{
        return request(server).post('/api/auth/investor/register')
                .send(goodAuth)
                .expect(201)
                .then(response=>{
                    expect(response.body.id).toBe(1)
                    expect(response.body.username).toBe('Goodboy')
                })
    })


    it('login works', ()=>{
        return request(server).post('/api/auth/investor/register')
                .send(goodAuth)
                .expect(201)
                .then(regRes=>{
                    return request(server).post('/api/auth/investor/login')
                        .send(goodAuth)
                        .expect(200)
                            .then(logRes=>{
                                expect(logRes.body.token).toBeTruthy()
                                expect(logRes.body.auth_id).toBe(1)
                            })
                })
    })


    it('Post for info works', ()=>{
        return request(server).post('/api/auth/investor/register')
                .send(goodAuth)
                .expect(201)
                .then(regRes=>{
                    return request(server).post('/api/auth/investor/login')
                        .send(goodAuth)
                        .expect(200)
                            .then(logRes=>{
                                const token = logRes.body.token
                                return request(server).post(`/api/investor/1/info`)
                                    .send(goodInfo)
                                    .set('authorization', `${token}`)
                                    .expect(200)
                                    .then(infRes=>{
                                        expect(infRes.body.inv_id).toBe(1)
                                    })
                            })
                })
    })


    it('Post for contact works', ()=>{
        return request(server).post('/api/auth/investor/register')
                .send(goodAuth)
                .expect(201)
                .then(regRes=>{
                    return request(server).post('/api/auth/investor/login')
                        .send(goodAuth)
                        .expect(200)
                            .then(logRes=>{
                                const token = logRes.body.token
                                return request(server).post(`/api/investor/1/contact`)
                                    .send(goodContact)
                                    .set('authorization', `${token}`)
                                    .expect(200)
                                    .then(conRes=>{
                                        console.log(conRes.body)
                                    })
                            })
                })
    })

    it('Post for saved works', ()=>{
        return request(server).post('/api/auth/investor/register')
                .send(goodAuth)
                .expect(201)
                .then(regRes=>{
                    return request(server).post('/api/auth/investor/login')
                        .send(goodAuth)
                        .expect(200)
                            .then(logRes=>{
                                const token = logRes.body.token
                                return request(server).post(`/api/investor/1/info`)
                                    .send(goodInfo)
                                    .set('authorization', `${token}`)
                                    .expect(200)
                                    .then(infRes=>{
                                        return request(server).post(`/api/investor/1/saved/1`)
                                            .send(goodSave)
                                            .set('authorization', `${token}`)
                                            .expect(200)
                                                .then(savRes=>{
                                                    expect(savRes.body.saved_projects).toHaveLength(1)
                                                })
                                    })
                            })
                })
    })


    it('Fill everything out and get investor info', async()=>{
        const regRes = await request(server)
            .post('/api/auth/investor/register')
            .send(goodAuth)
            .expect(201)

        const logRes = await request(server)
            .post('/api/auth/investor/login')
            .send(goodAuth)
            .expect(200)

        const token = logRes.body.token

        const infoRes = await request(server)
            .post(`/api/investor/1/info`)
            .send(goodInfo).set('authorization', `${token}`)
            .expect(200)

        const contactRes = await request(server)
            .post(`/api/investor/1/contact`)
            .send(goodContact).set('authorization', `${token}`)
            .expect(200)

        const saveRes = await request(server).post('/api/investor/1/saved/1')
            .send(goodSave)
            .set('authorization', `${token}`)
            .expect(200)
                                                        
        expect(saveRes.body.saved_projects).toHaveLength(1)
        
        const getInfo = await request(server).get('/api/investor/1/info/1')
            .set('authorization', `${token}`)
            .expect(200)
        
        expect(getInfo.body.investor).toBeTruthy()
        
    })
})

describe('Investor user can be edited and manipulated',()=>{
    it('createNewInvestor function is working and giving us the predicted data',async ()=>{
        const newInvestor = await createNewInvestor()
        expect(newInvestor).toBeTruthy()
        expect(newInvestor.token).toBeTruthy()
        expect(newInvestor.id).toBe(1)
        expect(newInvestor.name).toBe('steve')
        expect(newInvestor.description).toBe('I am steve')
        expect(newInvestor.auth_id).toBe(1)
        expect(newInvestor.contact_info.phone_number).toBe(3033033003)
        expect(newInvestor.offerings).toHaveLength(2)
        expect(newInvestor.saved_projects[0].state).toBe('NY')
    })

    it('update user info', async ()=>{
        const newInvestor = await createNewInvestor()

        const token = newInvestor.token

        const changes = {
            "name": "steven",
            "description": "I am steven",
            "city": "portland",
            "state": "or",
            "offers_capital": true,
            "offers_resources": false,
            "offers_mentorship": false
        }

        const updatedInvestor = await request(server).put('/api/investor/1/info/1')
            .set('authorization', `${token}`)
            .send(changes)
            .expect(200)
            expect(updatedInvestor.body.name).toBe('steven')
            expect(updatedInvestor.body.offerings).toHaveLength(1)
    })

    it('update contact info', async ()=>{
        const newInvestor = await createNewInvestor()
        const token = newInvestor.token
        
        const updatedContacts = await request(server).put('/api/investor/1/contact')
            .set('authorization', `${token}`)
            .send({
                "email": "example@email.com",
                "phone_number": 2022022002,
                "address": "ferrari down by the river"
                })
            .expect(200)
            console.log(updatedContacts.body)
    })

    it('remove a saved post', async ()=>{
        const newInvestor = await createNewInvestor()
        const token = newInvestor.token
        
        const saveRes = await request(server).post('/api/investor/1/saved/1')
            .send({"applicant_id": 3})
            .set('authorization', `${token}`)
            .expect(200)
        const updatedSaves = saveRes.body.saved_projects
        console.log(updatedSaves)
        const saveId = updatedSaves[1].id
        expect(updatedSaves).toHaveLength(2)
        
        const deleteSave = await request(server).delete(`/api/investor/1/saved/1/${saveId}`)
            .set('authorization', `${token}`)
            .expect(200)
            expect(deleteSave.body.saved_projects).toHaveLength(1)
    })

})

describe('authorization failure cases', ()=>{
    it('post info authentification', async ()=>{
        const info = await request(server).post(`/api/investor/1/info`)
                .expect(400)
        
        const info2 = await request(server).post('/api/investor/1/info/1')
            .set('authorization', '403418923412ewqrq')
            .expect(401)
    })
    it('post contact authentification', async ()=>{
        const info = await request(server).post(`/api/investor/1/contact`)
                .expect(400)
        
        const info2 = await request(server).post('/api/investor/1/contact/1')
            .set('authorization', '403418923412ewqrq')
            .expect(401)
    })
    it('post save authentification', async ()=>{
        const info = await request(server).post(`/api/investor/1/saved/1`)
                .expect(400)
        
        const info2 = await request(server).post('/api/investor/1/saved/1')
            .set('authorization', '403418923412ewqrq')
            .expect(401)
    })
    it('get info authentification', async ()=>{
        const info = await request(server).get(`/api/investor/1/info/1`)
                .expect(400)
        
        const info2 = await request(server).get('/api/investor/1/info/1')
            .set('authorization', '403418923412ewqrq')
            .expect(401)
    })

})

describe('validation failure cases', ()=>{
    it('register validation failure case 1', async ()=>{
        const fail1 =  await request(server)
            .post('/api/auth/investor/register')
            .send({
                "usernam": "Goodboy",
                "password": "testPassword"
            })
            .expect(400)
    })
    it('register validation failure case 2', async ()=>{
        await request(server)
            .post('/api/auth/investor/register')
            .send(goodAuth)
            .expect(201)
        const fail2 = request(server)
            .post('/api/auth/investor/register')
            .send(goodAuth)
            .expect(401)
    })
    it('login failure incorrect username', async ()=>{
        await request(server)
            .post('/api/auth/investor/register')
            .send(goodAuth)
            .expect(201)
        const fail = await request(server).post('/api/auth/investor/login')
            .send({
                "username": "Badboy",
                "password": "testPassword"
            })
            .expect(401)
    })
    it('login failure incorrect password', async ()=>{
        await request(server)
            .post('/api/auth/investor/register')
            .send(goodAuth)
            .expect(201)
        const fail = await request(server).post('/api/auth/investor/login')
            .send({
                "username": "Badboy",
                "password": "wrongPassword"
            })
            .expect(401)
    })
})


