module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Penabur_12",
    DB: "Final",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };