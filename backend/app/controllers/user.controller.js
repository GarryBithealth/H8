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
  
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data."
      });
    }
  }
  