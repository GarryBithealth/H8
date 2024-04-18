// Import modul yang diperlukan
const { create } = require('../controllers/controller'); // Sesuaikan dengan nama berkas Anda
const { Layanan } = require('../models/layanan'); // Sesuaikan dengan nama berkas dan model Anda

describe('create function', () => {
    test('should create a new Layanan and send data if request is valid', async () => {
      // Mock request and response objects
      const req = {
        body: {
          title: 'Test Title',
          description: 'Test Description',
          jenis: 'Test Jenis',
          rating: 5,
          alamat: 'Test Alamat',
          phone: '123456789',
          linkImg: 'test.jpg'
        }
      };
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
      // Mock Layanan.create to return a mock data
      const mockData = { id: 1, ...req.body };
      Layanan.create = jest.fn().mockResolvedValue(mockData);
  
      // Call the create function
      await create(req, res);
  
      // Verify that Layanan.create is called with the correct parameter
      expect(Layanan.create).toHaveBeenCalledWith(req.body);
      // Verify that the response is sent with the correct data
      expect(res.send).toHaveBeenCalledWith(mockData);
    });
  });