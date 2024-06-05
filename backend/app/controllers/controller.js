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

exports.update = (req, res) => {
  const id = req.params.id;

  Layanan.update(req.body, {
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


exports.findAll = async (req, res) => {
  try {
    const { title, alamat, jenis, rating } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : 
                      alamat ? { alamat: { [Op.iLike]: `%${alamat}%`}} : 
                      jenis ? { jenis: { [Op.iLike]: `%${jenis}%`}} :  null ;

    const data = await Layanan.findAndCountAll({ 
      include: [
        {
          model: Ulasan,
          as: 'ul',
          attributes: ['id', 'rating']
        }
      ],
      where: condition,
      limit: limit,
      offset: offset
    });

    const layananWithAverageRating = data.rows.map(layanan => {
      const ulasan = layanan.ul;
      const totalRating = ulasan.reduce((sum, ul) => sum + ul.rating, 0);
      const averageRating = ulasan.length > 0 ? (totalRating / ulasan.length).toFixed(1) : 0;

      return {
        ...layanan.get(), 
        averageRating: parseFloat(averageRating)
      };
    });

    const totalPages = Math.ceil(data.count.length / limit);

    res.status(200).send({
      services: layananWithAverageRating,
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
          ],
          attributes: [ "id" ,
          "ulasan",
          "rating",
          "gambar",
          "createdAt",
          "updatedAt"]
        }
      ],
      where: { id: id }
    });

    if (!data) {
      return res.status(404).send({
        message: `No reviews found for user with id=${id}`
      });
    }

    const ulasan = data.ul;
    const totalRating = ulasan.reduce((sum, ul) => sum + ul.rating, 0);
    const averageRating = ulasan.length > 0 ? (totalRating / ulasan.length).toFixed(2) : 0;

    const result = {
      ...data.get(), 
      averageRating: parseFloat(averageRating)
    };

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data."
    });
  }
};

