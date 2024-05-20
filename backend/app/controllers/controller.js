const db = require("../models");
const Layanan = db.layanan;
const Ulasan = db.ulasan;
const user = db.user

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const layanan = {
      title: req.body.title,
      description: req.body.description,
      jenis: req.body.jenis,
      alamat: req.body.alamat,
      phone: req.body.phone,
      linkImg: req.body.linkImg
    };

    const data = await Layanan.create(layanan);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating."
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const {title , alamat, jenis} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : alamat ? { alamat: { [Op.iLike]: `%${alamat}%`}} : jenis ? { jenis: { [Op.iLike]: `%${jenis}%`}} : null ;

    const data = await Layanan.findAndCountAll({ 
      where: condition,
      limit: limit,
      offset: offset
    });
    
    const totalPages = Math.ceil(data.count / limit);

    res.status(200).send({
      services: data.rows,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving."
    });
  }
};







exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Layanan.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).send({
        message: "Data was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Data with id=${id}`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Data with id" 
    });
  }
};



exports.findAllReviews = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Layanan.findOne({
      include: [
        {
          model: Ulasan,
          as: 'ul',
          include: [ 
            {
              model: user, 
              as: 'user', 
              attributes: ['id', 'username']
            }
          ]
        }
      ],
      where: { id: id }
    });

    if (!data) {
      return res.status(404).send({
        message: `No reviews found for user with id=${id}`
      });
    }

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  }
};
