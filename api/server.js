const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const mw = require('./middleware/middleware')

const postsRouter = require("./posts/posts-router")
const usersRouter = require("./users/users-router")

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());


// global middlewares and routes need to be connected here
server.use(helmet());
server.use(morgan('dev'));
server.use("/api/posts", postsRouter);
server.use("/api/user", usersRouter);


server.get('/', mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
