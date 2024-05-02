module.exports = app => {
    const home = require("../controllers/controller.js");
    const ulas = require("../controllers/ulasan.js");
    const user= require("../controllers/user.controller.js");

  
    var router = require("express").Router();
  
    router.post("/", home.create);

    //layanan
    router.get("/:id", home.findAllReviews);
//user
    
    router.get("/user/:id", user.findAllReviewsByUser);

  
    router.get("/", home.findAll);
  
    router.post("/add/:id", ulas.create)
  
  
    router.put("/:id", ulas.update);
  
    router.delete("/:id", home.delete);
  
    router.delete("/", home.deleteAll);

  
    app.use('/api/home', router);
  };