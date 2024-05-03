module.exports = app => {
    const home = require("../controllers/controller.js");
    const ulas = require("../controllers/ulasan.js");
    const user= require("../controllers/user.controller.js");

  
    var router = require("express").Router();
  
    router.post("/", home.create);

    //layanan
    router.get("/:id", home.findAllReviews);
//user
    
    router.get("/profile/:id", user.findAllReviewsByUser);

  
    router.get("/", home.findAll);
  
    router.post("/:id", ulas.create)
  
  
    router.put("/:id", ulas.update);
  
    router.delete("/profile/:id", ulas.delete);
  
    router.delete("/", home.deleteAll);

  
    app.use('/api/home', router);
  };