module.exports = (sequelize, Sequelize) => {
    const Layanan = sequelize.define("Layanan", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      jenis: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      alamat: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.BIGINT
      },
      linkImg: {
        type: Sequelize.STRING
      }
    });
  
    return Layanan;
  };