const request = require("supertest")
const server = require('../../server')

describe('create function', () => {
    it('check testing', async (done) => {
        await request(server)
        .get("/")
        .end((err, res)=>{
            if (err) {
                return done(err)
            }
            else{
                const {body,status} = res
                expect(status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith({ message: 'Content can not be empty!' });
            }
        })
    })
    console.log("saya ganteng")
})

