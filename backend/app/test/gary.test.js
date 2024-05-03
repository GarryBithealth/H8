const request= require('supertest')
const {sequelize} = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = require('../../server')


beforeAll(async()=>{
    const data = require('../data/user.json')

    data.forEach(el=>{

        el.password =  bcrypt.hashSync(el.password,10)
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
    await sequelize.queryInterface.bulkInsert('Users',data,{})
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, {});
});


describe('USER TESTING', ()=>{
    describe('/user/register - REGISTER TESTING',()=>{
        // tambahin usecasenya bukan hanya 201
        it('Response 201 - success register user',async ()=>{
            const body = {
                "username":"ilysa",
                "email":"ilyas@mail.com",
                "password":"sapiperah",
            }
            const result = await request(app).post('/api/auth/signup').send(body)
            expect(result.status).toBe(201)
            expect(result.body).toHaveProperty('status',true)
            expect(result.body).toHaveProperty('message','success')
        })
    })
    describe('/user/login - LOGIN TESTING',()=>{
        it('Response 200 - success login user', async ()=>{
            // + usecasenya ga hanya 200, 404,400
            const body = {
                "email":"kudabahenol@gmail.com",
                "password":"akusukakuda"
            }
            const result = await request(app).post('/api/auth/signin').send(body)
            //console.log(result)
            expect(result.status).toBe(200)
        })
        
    })
})
