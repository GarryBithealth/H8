module.exports = (sequelize, Sequelize) => {
    const Ulasan = sequelize.define("Ulasan", {
      ulasan: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      gambar: {
        type: Sequelize.STRING
      }
    });
  
    return Ulasan;
  };