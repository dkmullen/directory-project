/*jshint esversion: 6 */
/* This backend file extends route.js, defines the jobs each route requires. */

const express = require('express'),
  app = express(),
  jwt = require('jsonwebtoken'),
  config = require('../config'),
  Member = require('../models/member'),
  User = require('../models/user');

app.set('secretKey', config.secret);

module.exports = {
  // Get all the records
  getall(req, res, next) {
    Member.find({}) // Find all members
      // 'members' is what I choose to call what is returned from the find func
      .then(members => res.send(members)) // send it
      .catch(next); // in case of err, run the next thing, don't hang up here
  },

  // Get just one record by id
  getone(req, res, next) {
    // id matches :id from routes.js put method, carried in on params
    const memberId = req.params.id;
    Member.findById({ _id: memberId })
      .then(member => res.send(member))
      .catch(next);
  },

  // Create a new record
  create(req, res, next) {
    const memberProperties = req.body; // const = entire request body sent in
    Member.create(memberProperties) // create a new mem record out of the const
      .then(member => res.send(member))
      .catch(next);
  },

  // Edit just one record
  edit(req, res, next) {
    const memberId = req.params.id;
    const memberProperties = req.body; // req.body brings in the updated data
    // Update Member with new properties
    Member.findByIdAndUpdate({ _id: memberId }, memberProperties)
      .then(() => Member.findById({ _id: memberId })) // Find the updated Member
      .then(member => res.send(member))
      .catch(next);
  },

  // Delete just one record
  delete(req, res, next) {
    const memberId = req.params.id;
    const memberProperties = req.body;
    Member.findByIdAndRemove({ _id: memberId })
      // 204 = Server has fulfilled the request, & there is no additional info
      .then(member => res.status(204).send(member))
      .catch(next);
  },

  redirect(req, res, next) {
    console.log('redirecting...');
    res.status(300).send({ redirect: "$location.url('/login')"})
      .catch();
  },

  // Log in
  gettoken(req, res) {
    const memberFirstName = req.body.firstName;
    Member.findOne({ firstName: memberFirstName },
    (err, member) => {
    if (err) throw err;
        if (!member) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (member) {
        // check if password matches
        if (member.lastName != req.body.lastName) {
          res.json({ success: false, message: 'Authentication failed. Wrong lastName.' });
        } else {
          // if member is found and password is right
          // create a token
          var token = jwt.sign(member, app.get('secretKey'), {
            //expiresInMinutes: 1440 // expires in 24 hours - expiresInMinutes not allowed!
          });
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  },

  // route middleware to verify a token
  checktoken(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('secretKey'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {
      // if there is no token
      return res.get("$location.url('/login')");
      /*return res.status(401).send({
        success: false,
        message: 'No token provided.'
      });*/
    }
  }
};
