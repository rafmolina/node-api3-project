const express = require('express');
const mw = require("../middleware/middleware")

const db = require("./users-model")
// const posts = require("../posts/posts-model")

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  db.get(req.query)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: "you shall not user!!!"})
  });
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  db.insert(req.body)
  .then(post =>{
    res.status(200).json(post);
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({message: "Tron Legacy: USER ERROR"})
  });
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  db.update(req.user.id, req.body)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: "error user not updated"});
  });
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  db.remove(req.user.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message:"user not deleted"});
  });
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  db.getUserPosts(req.user.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message:"error retreiving user post"});
  });
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req, res
  //>>>>>??? go back to the video
});

// do not forget to export the router

module.exports = router;