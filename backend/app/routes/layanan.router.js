module.exports = app => {
    const home = require("../controllers/controller.js");
    const ulas = require("../controllers/ulasan.js");
    const user= require("../controllers/user.controller.js");

  
    var router = require("express").Router();
//layanan

    router.post("/", home.create);

    router.get("/:id", home.findAllReviews);//

    router.get("/", home.findAll);//

    router.delete("/:id", home.delete);//


//Ulasan
    
    router.post("/:id",ulas.upload, ulas.create)
  
    router.put("/:id", ulas.update);
  
    router.delete("/profile/", ulas.delete);
//user
    router.get("/profile/:id", user.findAllReviewsByUser);//

  
    app.use('/api/home', router);
  };