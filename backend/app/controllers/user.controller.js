const db = require("../models");
const User =db.user;
const Ulasan = db.ulasan;
const Layanan = db.layanan;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.findAllReviewsByUser = async (req, res) => {
    try {
      const id = req.params.id;
  
      const data = await User.findAll({
        include: [
          {
            model: Ulasan,
            as: 'us',
            include: [
              {
                model: Layanan,
                as: 'layanan',
                attributes: ['id', 'title']
              }
            ]
          }
        ],
        where: { id: id }
      });
  
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `No reviews found from user with id=${id}`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    }
  };
  
  