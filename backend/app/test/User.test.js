const request = require('supertest');
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require('../../server');
const server = require('../../server');

beforeAll(async () => {
    const data = require('../data/user.json');

    data.forEach(el => {
        el.password = bcrypt.hashSync(el.password, 10);
        el.createdAt = new Date();
        el.updatedAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert('users', data, {});
});

describe('USER TESTING', () => {
    describe('/user/register - REGISTER TESTING', () => {
        it('Response 201 - success register user', async () => {
            const body = {
                "username": "te",
                "email": "te1@mail.com",
                "password": "123",
                "roles": ["user"]
            };
            const result = await request(app).post('/api/auth/signup').send(body);
            expect(result.status).toBe(201);
        });

        it.skip('Response 500 - success Register user', async () => {
            const body = {
                "username": "il12ysa",
                "email": "ilya1212s@mail.com",
                "roles": ["us"]
            };
            const result = await request(app).post('/api/auth/signup').send(body);
            expect(result.status).toBe(500);
        });
    });

    describe('/user/login - LOGIN TESTING', () => {
        it('Response 200 - success login user', async () => {
            const body = {
                "username": "garry12312312",
                "password": "123123124324"
            };
            const result = await request(app).post('/api/auth/signin').send(body);
            expect(result.status).toBe(200);
        });

        it('Response 404 - not found in login user', async () => {
            const body = {
                "username": "ehwhef@gmail.com",
                "password": "123123124324"
            };
            const result = await request(app).post('/api/auth/signin').send(body);
            expect(result.status).toBe(404);
        });

        it('Response 401 - unauthorized login user', async () => {
            const body = {
                "username": "garry12312312",
                "password": "12231"
            };
            const result = await request(app).post('/api/auth/signin').send(body);
            expect(result.status).toBe(401);
        });

        it('Response 500 - internal server error login user', async () => {
            const body = {
                "username": "garry12312312",
            };
            const result = await request(app).post('/api/auth/signin').send(body);
            expect(result.status).toBe(500);
        });
    });

    describe('USER find review', () => {
        describe('/user/home/profile/:id - find Review by id TESTING', () => {
            it('Response 200 - success register user', async () => {
                const id = 219;
                const result = await request(app).get(`/api/home/profile/${id}`);
                expect(result.status).toBe(200);
            });
        });

        describe('/user/home/profile/:id - find Review by id TESTING', () => {
            it('Response 404 - not found register user', async () => {
                const id = 10;
                const result = await request(app).get(`/api/home/profile/${id}`);
                expect(result.status).toBe(404);
            });
        });
        describe('/user/home/profile/:id - find Review by id TESTING', () => {
            it('should return 500 - internal server error when registering user', async () => {
                const id  = `10d`
                const result = await request(app).get(`/api/home/profile/${id}`);
                expect(result.status).toBe(500);
            });
        });
    });
});