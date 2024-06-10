
if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config();
}
const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin) {
          return callback(null, true);
      }
      return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
const Role = db.role;

//prod
db.sequelize.sync();

   function initial() {
    Role.create({
       id: 1,
      name: "user"
     });
  
     Role.create({
      id: 2,
       name: "moderator"
     });
  
     Role.create({
       id: 3,
       name: "admin"
     });
   }


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/layanan.router")(app);



const PORT = process.env.PORT || 3000;
console.log(PORT)
  app.listen(PORT, () => {
    console.log("process env")
  })


module.exports = app;
