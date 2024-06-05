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
            const id = 60
            const body = {
                "userId": 219,
                "ulasan": "keren banget obatnya banyak",
                "rating": 4,
                "gambar": ""
            }
            const result = await request(app).post(`/api/home/${id}`).send(body)
            expect(result.status).toBe(201)
        })
    })
    describe('/api/home/ - Ulasan Post TESTING',()=>{
        it('Response 400 - contect cannot be empty when Post ulasan',async ()=>{
            const id = 59
            const body = {
                "userId": 10,
                "rating": "keren banget obatnya banyak"
            }
            const result = await request(app).post(`/api/home/${id}`).send(body)
            expect(result.status).toBe(400)
        })
    })
    describe('/api/home/ - Ulasan Post TESTING',()=>{
        it('Response 500 - internal server error when Post ulasan',async ()=>{
            const id = "59d"
            const body = {
                "userId": 10,
                "ulasan": "keren banget obatnya banyak",
                "rating": "keren banget obatnya banyak"
            }
            const result = await request(app).post(`/api/home/${id}`).send(body)
            expect(result.status).toBe(500)
        })
    })
})



describe('Ulasan Update TESTING', ()=>{
    describe('/api/home/:id - Ulasan update TESTING',()=>{
        it('Response 200 - success update ulasan by id',async ()=>{
            const id = 60
            const body = {
                "userId": 219,
                "ulasan": "keren banget obatnya banyak",
                "rating": 5,
                "gambar": ""
            }
            const result = await request(app).put(`/api/home/${id}`).send(body)
            expect(result.status).toBe(200)
        })
    })
    describe('/api/home/:id - Ulasan update by id',()=>{
        it('Response 400 - error title update ulasan by id',async ()=>{
            const id = 59;
            const body = {
                "userId": 218,
                "rating": 5,
                "gambar": ""
            }
            const result = await request(app).put(`/api/home/${id}`).send(body)
            expect(result.status).toBe(400)
        })
    })
    describe('/api/home/:id - Ulasan update by id',()=>{
        it('Response 404 - not found update ulasan by id',async ()=>{
            const id = 1;
            const body = {
                "userId": 10,
                "ulasan": "keren banget obatnya banyak",
                "rating": 5,
                "gambar": ""
            }
            const result = await request(app).put(`/api/home/${id}`).send(body)
            expect(result.status).toBe(404)
        })
    })
    describe('/api/home/:id - Ulasan update by id',()=>{
        it('Response 500 - internal server error when update ulasan by id',async ()=>{
            const id = "1d";
            const body = {
                "userId": 10,
                "ulasan": "keren banget obatnya banyak",
                "rating": 5,
                "gambar": ""
            }
            const result = await request(app).put(`/api/home/${id}`).send(body)
            expect(result.status).toBe(500)
        })
    })
})

describe('Delete Ulasan TESTING', ()=>{
    describe('/api/home/:id - delete Ulasan by id',()=>{
        it('Response 200 -  Ulasan delete by id',async ()=>{
            const body ={
                "userId": 217,
                "layanansId": 60,
                "gambar": ""
              }
            const result = await request(app).delete(`/api/home/profile/`).send(body)
            expect(result.status).toBe(200)
        })
    }) 
    describe('/api/home/:id - delete Ulasan by id',()=>{
        it('Response 404 - not found Ulasan Get by id',async ()=>{
            const body ={
                "userId": 219,
                "layanansId":59,
                "gambar": ""
              }
            const result = await request(app).delete(`/api/home/profile/`).send(body)
            expect(result.status).toBe(404)
        })
    }) 
    describe('/api/home/:id - delete Ulasan by id',()=>{
        it('Response 500 - internal server error Ulasan Get by id',async ()=>{
            const body ={
                "layanansId": "2d",
                "userId": "10"
              }
            const result = await request(app).delete(`/api/home/profile/`).send(body)
            expect(result.status).toBe(500)
        })
    }) 
})