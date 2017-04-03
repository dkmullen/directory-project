/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

/* app contains our router, controller, model - app is an object that takes
incoming requests, and based on method and route, will run code */
const app = express();

// Mongoose's promise implementation ('mpromise') is now deprecated and throws a Warning
// so we tell Mongoose to use ES6 implementation of promise, inside the node.js environment
mongoose.Promise = global.Promise;

// If not in test mode, connect to the DB (the var below set in package.json's test command)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/directory_project');
}
// Take any request and parse it into json. This app.use call must come before the routes call!!!
app.use(bodyParser.json());

// Call the routes function, passing in the app
routes(app);

// Register our new middleware (and any middleware) with app.use
// Err, if any, is thrown by the process directly previous to this one (the req handler in this case)
// next is a function. Manually calls the next middleware in the chain
app.use((err, req, res, next) => {
  // 422 manually set a status (422 = unprocessable entity)
  res.status(422).send({ error: err.message });
});

// Make it available to other modules
module.exports = app;
