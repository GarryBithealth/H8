const jwt = require('jsonwebtoken');
const authJwt = require('../middleware/authJwt');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;

describe('Authentication Middleware Testing', () => {
    let token;

    beforeAll(async () => {
        token = jwt.sign({ id: 123 }, config.secret, { expiresIn: 3600 });
    });

    describe('verifyToken', () => {
        it('should return 403 if no token provided', () => {
            const req = { headers: {} };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            authJwt.verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ message: "No token provided!" });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 401 if token is expired', () => {
            const req = { headers: { 'x-access-token': 'expiredToken' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
                callback({ name: 'TokenExpiredError' });
            });

            authJwt.verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({ message: "Unauthorized! Access Token was expired!" });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 401 if token is invalid', () => {
            const req = { headers: { 'x-access-token': 'invalidToken' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
                callback({ name: 'JsonWebTokenError' });
            });

            authJwt.verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({ message: "Unauthorized!" });
            expect(next).not.toHaveBeenCalled();
        });

        it('should call next if token is valid', () => {
            const req = { headers: { 'x-access-token': token } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();

            jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
                callback(null, { id: 123 });
            });

            authJwt.verifyToken(req, res, next);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
            expect(req.userId).toBe(123);
        });
    });

    describe('isAdmin', () => {
        it('should return 403 if user is not an admin', async () => {
            const req = { userId: 456 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'user' }])
            });
    
            await authJwt.isAdmin(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ message: "Require Admin Role!" });
            expect(next).not.toHaveBeenCalled();
        });
    
        it('should call next if user is an admin', async () => {
            const req = { userId: 789 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'admin' }])
            });
    
            await authJwt.isAdmin(req, res, next);
    
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    });
    
    describe('isModerator', () => {
        it('should return 403 if user is not a moderator', async () => {
            const req = { userId: 456 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'user' }])
            });
    
            await authJwt.isModerator(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ message: "Require Moderator Role!" });
            expect(next).not.toHaveBeenCalled();
        });
    
        it('should call next if user is a moderator', async () => {
            const req = { userId: 789 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'moderator' }])
            });
    
            await authJwt.isModerator(req, res, next);
    
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    });
    
    describe('isModeratorOrAdmin', () => {
        it('should return 403 if user is neither moderator nor admin', async () => {
            const req = { userId: 456 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'user' }])
            });
    
            await authJwt.isModeratorOrAdmin(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({ message: "Require Moderator or Admin Role!" });
            expect(next).not.toHaveBeenCalled();
        });
    
        it('should call next if user is a moderator', async () => {
            const req = { userId: 789 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'moderator' }])
            });
    
            await authJwt.isModeratorOrAdmin(req, res, next);
    
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    
        it('should call next if user is an admin', async () => {
            const req = { userId: 789 };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            const next = jest.fn();
    
            jest.spyOn(User, 'findByPk').mockResolvedValueOnce({
                getRoles: jest.fn().mockResolvedValueOnce([{ name: 'admin' }])
            });
    
            await authJwt.isModeratorOrAdmin(req, res, next);
    
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    });    
});

