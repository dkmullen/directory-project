/*jshint esversion: 6 */
// This file contains instruction about what to do with incoming routes.

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

  // Create a new record
  create(req, res, next) {
    const memberProperties = req.body; // const = entire request body sent in
    Member.create(memberProperties) // create a new mem record out of the const
      .then(member => res.send(member))
      .catch(next);
  },

  // Get just one record by id
  getone(req, res, next) {
    // id matches :id from routes.js put method, carried in on params
    const memberId = req.params.id;
    Member.findById({ _id: memberId })
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

  // Log in
  login(req, res) {
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
  }
};
