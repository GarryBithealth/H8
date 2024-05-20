const request = require('supertest');
const app = require('../../server');
const db = require('../models');
const verifySignUp = require('../middleware/verifySignUp');

beforeAll(async () => {
  await db.user.create({
    username: '121212312',
    email: '1232112133@example.com',
    password: 'password123',
  });
});

describe('Verify Sign Up Middleware', () => {
  describe('checkDuplicateUsernameOrEmail', () => {
    it('should return status 400 if username is already in use', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: 'ilyasa', email: '123123123@example.com', password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Failed! Username is already in use!');
    });

    it('should return status 400 if email is already in use', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: 'te1221313', email: 'iyasaffan@gmail.com', password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Failed! Email is already in use!');
    });

    it.skip('should return status 500 if email and username is already in use', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: 'ilyasa', email: 'iyasaffan@gmail.com', password: 'password123' });
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Failed! Email and username is already in use!');
    });

    it('should call next middleware if username and email are not in use', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: 'te12345', email: 'te12345@example.com', password: 'password123' });
      expect(res.status).toBe(201); 
    });
  });

  describe('checkRolesExisted', () => {
    it('should return status 400 if role does not exist', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: '235235235323', email: '123152323523@example.com', password: 'password123', roles: ['invalidRole'] });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Failed! Role does not exist = invalidRole');
    });

    it.skip('should call next middleware if all roles are valid', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: '21312314433', email: '234235532235@example.com', password: 'password123', roles: ['budy'] });
      expect(res.status).toBe(500); 
    });
  });
});