module.exports = 
{
  "Dev":{
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "",
    DB: "Final",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "production":{
    "use_env_variabel" : "DATABASE_URL"
  }  
}