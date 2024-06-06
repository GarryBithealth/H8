module.exports = app => {
    const home = require("../controllers/controller.js");
    const ulas = require("../controllers/ulasan.js");
    const user= require("../controllers/user.controller.js");

  
    var router = require("express").Router();
//layanan

    router.post("/", home.create);

    router.get("/:id", home.findAllReviews);//

    router.get("/", home.findAll);//




//Ulasan
    
    router.post("/:id",ulas.upload, ulas.create)
  
    router.put("/:id",ulas.upload, ulas.update);
      
    router.delete("/profile/", ulas.deleteul);
//user
    router.get("/profile/:id", user.findAllReviewsByUser);//
    router.put("/edit/:id", home.update);
    router.delete("/:id", home.delete);//  
    app.use('/api/home', router);
  };