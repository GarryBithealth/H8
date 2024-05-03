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
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating."
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    const data = await Layanan.findAll({ where: condition });
    
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving."
    });
  }
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Layanan.findByPk(id);

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Data with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving with id=" + id
    });
  }
};



exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Layanan.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Data was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating with id=" + id
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
      res.send({
        message: "Data was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Data with id=" + id
    });
  }
};


exports.deleteAll = async (req, res) => {
  try {
    const nums = await Layanan.destroy({
      where: {},
      truncate: false
    });

    res.send({ message: `${nums} data were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all data."
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

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  }
};

