const express = require('express');

const db = require("./posts-model")
const mw = require("../middleware/middleware")

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  db.get(req.query)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: "error retrieving post"});
  });
});

router.get('/:id', mw.validatePost, (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  db.getById(req.params.id)
  .then(post => {
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: "post not found"})
    }
  });
});

// do not forget to export the router

module.exports = router;
