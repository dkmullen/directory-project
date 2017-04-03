/*jshint esversion: 6 */
// This file routes incoming requests
const HouseholdsController = require('../controllers/households_controller');
// Receive app as the argument from app.js
module.exports = (app) => {
  /* For the GET method...Whenever a GET req comes in for the / route, run
   this function. Send back the object. In this case, the request is for:
   http://localhost:3050/ - 3050 comes from index.js
  */
  app.get('/households', HouseholdsController.getall);
  app.post('/households', HouseholdsController.create);
  // :id is a wildcard - any value can go here
  app.get('/households/:id', HouseholdsController.getone);
  app.put('/households/:id', HouseholdsController.edit);
  app.delete('/households/:id', HouseholdsController.delete);
};
