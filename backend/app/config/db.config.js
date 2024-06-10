module.exports = 
{
  "Dev":{
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "",
    DB: "Final",
    dialect: "postgres",
  },
  "production":{
    HOST: "aws-0-ap-southeast-1.pooler.supabase.com",
    USER: "postgres.zpuzihtroapafucuhvdi",
    PASSWORD: "Dl91eK5yJ4eYAV9g",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
}