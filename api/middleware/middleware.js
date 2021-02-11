const User = require("../users/users-model");




function logger(req, res, next) {
  // do your magic!
  console.log(
  `Request Method: ${req.method},
  Request URL: ${req.url},
  Request Timestamp: ${Date.now()}
  `)
  next();
}

function validateUserId (req, res, next) {
  // do your magic!
  const {id} = req.params
  User.getById(id)
  .then(user => {
    if(user){
      res.status(200).json({message:`User with ${id} found`})
      req.user=user
      next();
    }else{
      res.status(404).json({message: "user not found"});
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Jurassic Park type error"});
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing body data"});
  }else{
    if(!req.body.text){
      res.status(400).json({message: "missing required name field"});
    }else{
      next();
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing post data"});
  }else{
    if(!req.body.text) {
      res.status(400).json({message: "missing required text field"});
    }else{
      next();
    }
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}