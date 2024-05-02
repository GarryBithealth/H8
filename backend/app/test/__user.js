
const { create } = require('../controllers/controller'); 
const { Layanan } = require('../models/layanan'); 
const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe('create function', () => {
  beforeEach(() => {
    // Clear all mock calls between tests
    jest.clearAllMocks();
  });

  it('should return 400 if title is not provided', async () => {
    const req = {
      body: {
        description: 'Description',
        jenis: 'Jenis',
        alamat: 'Alamat',
        phone: 'Phone',
        linkImg: 'LinkImg',
      },
    };

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Content can not be empty!' });
  });

  it('should create a new entry if all required data is provided', async () => {
    const req = {
      body: {
        title: 'Title',
        description: 'Description',
        jenis: 'Jenis',
        alamat: 'Alamat',
        phone: 'Phone',
        linkImg: 'LinkImg',
      },
    };

    const mockData = {
      title: 'Title',
      description: 'Description',
      jenis: 'Jenis',
      alamat: 'Alamat',
      phone: 'Phone',
      linkImg: 'LinkImg',
    };

    Layanan.create = jest.fn().mockResolvedValue(mockData);

    await create(req, res);

    expect(Layanan.create).toHaveBeenCalledWith(mockData);
    expect(res.send).toHaveBeenCalledWith(mockData);
  });

  it('should return 500 if an error occurs during creation', async () => {
    const req = {
      body: {
        title: 'Title',
        description: 'Description',
        jenis: 'Jenis',
        alamat: 'Alamat',
        phone: 'Phone',
        linkImg: 'LinkImg',
      },
    };

    const mockError = new Error('Mock error');
    Layanan.create = jest.fn().mockRejectedValue(mockError);

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Some error occurred while creating.' });
  });
});