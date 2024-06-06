module.exports = app => {
    const home = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    router.post("/", home.create);
  
    router.get("/", home.findAll);
  
    router.get("/published", home.findAllPublished);
  
    router.get("/:id", home.findOne);
  
    router.put("/:id", home.update);
  
    router.delete("/:id", home.delete);
  
    router.delete("/", home.deleteAll);
  
    app.use('/api/home', router);
  };