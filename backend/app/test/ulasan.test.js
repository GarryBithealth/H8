const request= require('supertest')
const {sequelize} = require("../models")
const app = require('../../server')
const server = require('../../server')

beforeAll(async()=>{
    const data = require('../data/ulasan.json')

    data.forEach(el=>{
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
    await sequelize.queryInterface.bulkInsert('Ulasans',data,{})
})

describe('Ulasan Post TESTING', ()=>{
    describe('/api/home/ - Ulasan Post TESTING',()=>{
        it('Response 201 - success Post ulasan',async ()=>{
            const id = 59
            const body = {
                "userId": 10,
                "ulasan": "keren banget obatnya banyak",
                "rating": 5
            }
            const result = await request(app).post(`/api/home/${id}`).send(body)
            expect(result.status).toBe(201)
        })
    })
})



describe('Ulasan Update TESTING', ()=>{
    describe('/api/home/:id - Ulasan update TESTING',()=>{
        it('Response 200 - success update ulasan by id',async ()=>{
            const id = 58
            const body = {
                "userId": 10,
                "ulasan": "keren banget obatnya banyak",
                "rating": 5
            }
            const result = await request(app).put(`/api/home/${id}`).send(body)
            expect(result.status).toBe(200)
        })
    })
    describe('/api/home/:id - Ulasan update by id',()=>{
        it('Response 404 - not found update ulasan by id',async ()=>{
            const id = 1;
            const body = {
                "userId": 10,
                "ulasan": "keren banget obatnya banyak",
                "rating": 5
            }
            const result = await request(app).put(`/api/home/${id}`).send(body)
            expect(result.status).toBe(404)
        })
    })
})

describe('Delete Ulasan TESTING', ()=>{
    describe('/api/home/:id - delete Ulasan by id',()=>{
        it('Response 200 -  Ulasan delete by id',async ()=>{
            const body ={
                "userId": "219",
                "layanansId": "63"
              }
            const result = await request(app).delete(`/api/profile/`).send(body)
            expect(result.status).toBe(200)
        })
    }) 
    describe('/api/home/:id - delete Ulasan by id',()=>{
        it('Response 404 - not found Ulasan Get by id',async ()=>{
            const body ={
                "userId": "10",
                "layanansId": "2"
              }
            const result = await request(app).delete(`/api/profile/`).send(body)
            expect(result.status).toBe(404)
        })
    }) 
})