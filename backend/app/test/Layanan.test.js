const request= require('supertest')
const {sequelize} = require("../models")
const bcrypt = require("bcrypt")
const app = require('../../server')

beforeAll(async()=>{
    const data = require('../data/layanan.json')

    data.forEach(el=>{
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
    await sequelize.queryInterface.bulkInsert('Layanans',data,{})
})




describe('POST LayananTESTING', ()=>{
    describe('/api/home - Post Layanan',()=>{
        it('Response 201 - success Layanan Post',async ()=>{
            const body = {
                "title":"Apotek 31",
                "description": "apotek keren",
                "jenis": "Apotek",
                "published": true,
                "alamat": "jakarta",
                "phone": "0812921929",
                "linkImg": "p",
            }
            const result = await request(app).post('/api/home').send(body)
            expect(result.status).toBe(201)
        })
    })
    describe('/api/home - Post Layanan',()=>{
        it('Response 400 - error no Title Layanan Post',async ()=>{
            const body = {
                "title":"",
                "description": "apotek keren",
                "jenis": "Apotek",
                "published": true,
                "alamat": "jakarta",
                "phone": "0812921929",
                "linkImg": "p",
            }
            const result = await request(app).post('/api/home').send(body)
            expect(result.status).toBe(400)
        })
    })
    describe('/api/home - Post Layanan',()=>{
        it('Response 500 - internal server error Layanan Post',async ()=>{
            const body = {
                "title":"",
                "description": "apotek keren",
                "jenis": "Apotek",
                "published": true,
                "alamat": "jakarta",
                "phone": "0812921929",
                "linkImg": 5,
            }
            const result = await request(app).post('/api/home').send(body)
            expect(result.status).toBe(400)
        })
    })
})

describe('Get Layanan TESTING by id', ()=>{
    describe('/api/home/:id - Get Layanan by id',()=>{
        it('Response 200 - success Layanan Get by id',async ()=>{
            const Layanan = 100;
            const result = await request(app).get(`/api/home/${Layanan}`)
            expect(result.status).toBe(200)
        })
    })
    describe('/api/home/:id - Get Layanan by id',()=>{
        it('Response 404 - not found Layanan Get by id',async ()=>{
            const Layanan = 58;
            const result = await request(app).get(`/api/home/${Layanan}`)
            expect(result.status).toBe(404)
        })
    })
    describe('/api/home/:id - Get Layanan by id',()=>{
        it('Response 500 - internal server error Layanan Get by id',async ()=>{
            const result = await request(app).get(`/api/home/`)
            expect(result.status).toBe(500)
        })
    })
})

describe('Get Layanan TESTING', ()=>{
    describe('/api/home/ - Get Layanan',()=>{
        it('Response 200 - success Layanan Get',async ()=>{
            const result = await request(app).get(`/api/home/`)
            expect(result.status).toBe(200)
        })
    })   
        it('Response 500 - internal server error Layanan Get',async ()=>{
            const result = await request(app).get('/api/home/titles=5')
            expect(result.status).toBe(500)
        })
 })  


describe('Delete Layanan TESTING', ()=>{
    describe('/api/home/:id - delete Layanan by id',()=>{
        it('Response 200 -  Layanan delete by id',async ()=>{
            const Layanan = 258;
            const result = await request(app).delete(`/api/home/${Layanan}`)
            expect(result.status).toBe(200)
        })
    }) 
    describe('/api/home/:id - Get Layanan by id',()=>{
        it('Response 404 - not found Layanan delete by id',async ()=>{
            const Layanan = 62;
            const result = await request(app).delete(`/api/home/${Layanan}`)
            expect(result.status).toBe(404)
        })
    }) 
    describe('/api/home/:id - Get Layanan by id',()=>{
        it('Response 500 - error internal server Layanan delete by id',async ()=>{
            const Layanan = '62d';
            const result = await request(app).delete(`/api/home/${Layanan}`)
            expect(result.status).toBe(500)
        })
    }) 
})





