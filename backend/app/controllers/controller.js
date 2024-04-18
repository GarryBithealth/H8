const db = require("../models");
const Layanan = db.layanan;
const Ulasan = db.ulasan;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const layanan = {
      title: req.body.title,
      description: req.body.description,
      jenis: req.body.jenis,
      alamat: req.body.alamat,
      phone: req.body.phone,
      linkImg: req.body.linkImg
    };
  
    Layanan.create(layanan)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating."
        });
      });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Layanan.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Layanan.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Data with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving with id=" + id
        });
      });
  };

exports.update = (req, res) => {
    const id = req.params.id;
  
    Layanan.update && (req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Data was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Layanan.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Data was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Data with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Layanan.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} data were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all data."
        });
      });
  };

exports.findAllPublished = (req, res) => {
    Layanan.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Data."
        });
      });
  };

  exports.findAllReviews = (req, res) => {
    const id = req.params.id;

    Layanan.findAll({
      include: [{
        model: Ulasan,
        as: 'ul',
      }],
      where: { id: 2 }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data."
      });
    });
  };

   exports.findAllReviews = (req, res) => {
    const id = req.params.id;

    Layanan.findAll({
      include: [{
        model: Ulasan,
        as: 'ul',
      }],
      where: { id: 2 }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data."
      });
    });
  };
  