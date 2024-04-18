const db = require("../models");
const Ulasan = db.ulasan;


const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.ulasan) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const ulasan = {
        ulasan: req.body.ulasan,
        rating: req.body.rating
    };
  
    Ulasan.create(ulasan)
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

  
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Ulasan.findByPk(id)
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
  
    Ulasan.update && (req.body, {
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
  
    Ulasan.destroy({
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

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Ulasan.findAll({ where: condition })
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

