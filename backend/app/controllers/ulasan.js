const db = require("../models");
const Ulasan = db.ulasan;


const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.ulasan) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const ulasan = {
      layanansId: id,
      userId: req.body.userid,
      ulasan: req.body.ulasan,
      rating: req.body.rating
    };

    const data = await Ulasan.create(ulasan);

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating."
    });
  }
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Ulasan.findByPk(id);

    if (data) {
      res.send(data);
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
  try {
    const id = req.params.id;

    const num = await Ulasan.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).send({
        message: "Data was updated successfully."
      });
    } else if (num == 0) {
      res.status(404).send({
        message: `Cannot update Data with id=${id}. Data not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating with id=" + id
    });
  }
};



exports.delete = async (req, res) => {
  try {
    const { userId, layanansId } = req.body;

    const num = await Ulasan.destroy({
      where: { userId: userId, layanansId: layanansId }
    });

    if (num == 1) {
      res.status(200).send({
        message: "Data was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Data with userId=${userId} and layanansId=${layanansId}. Maybe Data was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Data with userId=" + userId + " and layanansId=" + layanansId
    });
  }
};



exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    const data = await Ulasan.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving."
    });
  }
};
