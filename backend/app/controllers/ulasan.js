const db = require("../models");
const Ulasan = db.ulasan;
const Op = db.Sequelize.Op;
const multer = require("multer")
const path = require("path")

exports.create = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.ulasan) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    console.log(req.body.ulasan)

    const ulasan = {
      layanansId: id,
      userId: req.body.userId,
      ulasan: req.body.ulasan,
      rating: req.body.rating,
      gambar: req.file?.path || null
    };

    console.log(ulasan)

    const data = await Ulasan.create(ulasan);

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating."
    });
  }
};

exports.update = async (req, res) => {
  try {
    const layanansId = req.params.id;

    if (!req.body.ulasan) {
      return res.status(400).send({
        message: "Request body can not be empty!",
      });
    }

    const { userId, ulasan, rating } = req.body;
    const gambar = req.file ? req.file.path : null;

    console.log(req.body);

    const updateData = { ulasan, rating };
    if (gambar) {
      updateData.gambar = gambar;
    }

    const [num] = await Ulasan.update(updateData, {
      where: { layanansId, userId },
    });

    if (num === 1) {
      res.status(200).send({
        message: "Data was updated successfully.",
      });
    } else {
      res.status(404).send({
        message: `Cannot update Data with layanansId=${layanansId} and userId=${userId}. Data not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating data.",
    });
  }
}; 




exports.deleteul = async (req, res) => {
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
        message: `Cannot delete Data`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Data layanan"
    });
  }
};


const storage = multer.diskStorage({
  destination: '../Images',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: '10000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('gambar') 



