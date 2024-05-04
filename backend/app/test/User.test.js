const request= require('supertest')
const {sequelize} = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = require('../../server')
const server = require('../../server')

beforeAll(async()=>{
    const data = require('../data/user.json')

    data.forEach(el=>{

        el.password =  bcrypt.hashSync(el.password,10)
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
    await sequelize.queryInterface.bulkInsert('users',data,{})
})




describe('USER TESTING', ()=>{
    describe('/user/register - REGISTER TESTING',()=>{
        // tambahin usecasenya bukan hanya 201
        it('Response 201 - success register user',async ()=>{
            const body = {
                "username":"il12ysa",
                "email":"ilya1212s@mail.com",
                "password":"",
            }
            const result = await request(app).post('/api/auth/signup').send(body)
            expect(result.status).toBe(201)
        })
    })
    describe('/user/login - LOGIN TESTING',()=>{
        it('Response 200 - success login user', async ()=>{
            // + usecasenya ga hanya 200, 404,400
            const body = {
                "username":"il12ysa",
                "password":""
            }
            const result = await request(app).post('/api/auth/signin').send(body)
            //console.log(result)
            expect(result.status).toBe(200)
        })
        it('Response 500 - success login user', async ()=>{
            // + usecasenya ga hanya 200, 404,400
            const body = {
                "email":"kudabahenol@gmail.com",
                "password":"akusukakuda"
            }
            const result = await request(app).post('/api/auth/signin').send(body)
            //console.log(result)
            expect(result.status).toBe(500)
        })
        
    })
})

describe('USER find review', ()=>{
    describe('/user/home/profile/:id - find Review by id TESTING',()=>{
        it('Response 200 - success register user',async ()=>{
            const id = 219
            const result = await request(app).get(`/api/home/profile/${id}`)
            expect(result.status).toBe(200)
        })
    })
    describe('/user/home/profile/:id - find Review by id TESTING',()=>{
        it('Response 404 - not found register user',async ()=>{
            const id = 10
            const result = await request(app).get(`/api/home/profile/${id}`)
            expect(result.status).toBe(404)
        })
    })
})
