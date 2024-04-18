module.exports = app => {
    const home = require("../controllers/controller.js");
    const ulas = require("../controllers/ulasan.js");
    const user= require("../controllers/user.controller.js");

  
    var router = require("express").Router();
  
    router.post("/", home.create);

    //layanan
    router.get("/getu/:id", home.findAllReviews);
//user
    
    router.get("/user/:id", user.findAllReviewsByUser);

  
    router.get("/", home.findAll);
  
    router.get("/published", home.findAllPublished);
  
    router.get("/:id", home.findOne);
  
    router.put("/:id", home.update);
  
    router.delete("/:id", home.delete);
  
    router.delete("/", home.deleteAll);

//ulas
    
      router.post("/ulas", ulas.create);
    
      router.get("/ulas", ulas.findAll);
      
      router.get("/ulas/:id", ulas.findOne);
    
      router.put("/ulas/:id", ulas.update);
    
      router.delete("/ulas/:id", ulas.delete);
    
  
    app.use('/api/home', router);
  };