/*jshint esversion: 6 */
const express = require('express');

/* app contains our router, controller, model - app is an object that takes
incoming requests, and based on method and route, will run code */
const app = express();

/* For the GET method...Whenever a GET req comes in for the /api route, run
 this function. Send back the object. In this case, the request is for:
 http://localhost:3050/api
*/
app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});

// Make it available to other modules
module.exports = app;
