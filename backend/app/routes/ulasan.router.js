module.exports = app => {
    const ulas = require("../controllers/ulasan.js");
  
    var router = require("express").Router();
  
    router.post("/", ulas.create);
  
    router.get("/", ulas.findAll);
    
    router.get("/:id", ulas.findOne);
  
    router.put("/:id", ulas.update);
  
    router.delete("/:id", ulas.delete);
  
    app.use('/api/ulas', router);
  };