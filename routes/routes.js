/*jshint esversion: 6 */
// This file routes incoming requests
const MemberController = require('../controllers/member_controller');
// Receive app as the argument from app.js
module.exports = (app) => {
  /* For the GET method...Whenever a GET req comes in for the /members route,
   run this function. Send back the object. In this case, the request is for:
   http://localhost:3000/ - 3000 comes from index.js  */
  //app.post('/auth', MemberController.gettoken);
  //app.get('/login', MemberController.login);
  //app.use( '/', MemberController.checktoken);
  app.get('/members', MemberController.getall);
  app.post('/members', MemberController.create);
  // :id is a wildcard - any value can go here
  app.get('/members/:id', MemberController.getone);
  app.put('/members/:id', MemberController.edit);
  app.delete('/members/:id', MemberController.delete);
};
