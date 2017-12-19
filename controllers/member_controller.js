/*jshint esversion: 6 */
/* This backend file extends route.js, defines the jobs each route requires. */

const Member = require('../models/member'),
  User = require('../models/user');

module.exports = {

  // Get all the records
  getall(req, res, next) {
    Member.find({}) // Find all members
      // 'members' is what I choose to call what is returned from the find func
      .then(members => res.send(members)) // send it
      .catch(data => res.send(data)); // in case of err, run the next thing, don't hang up here
  },

  // Get just one record by id
  getone(req, res, next) {
    // id matches :id from routes.js put method, carried in on params
    const memberId = req.params.id;
    Member.findById({ _id: memberId })
      .then(member => res.send(member))
      .catch(next);
  },

  // Get my Member record for editing on the Your Record view
  getme(req, res) {
    User.findOne({token: req.headers['x-access-token']})
    .then((user) => {
      Member.findOne({ _creator: user._id })
      .then((member) => {
        res.send(member || {}); // if user doesn't have a record yet, return {}
      })
      .catch((e) => {
        res.status(400).send(e);
      });
    })
   .catch((e) => {
     res.status(400).send(e);
   });
  },

  // Create a new record
  create(req, res, next) {
    const memberProperties = {
      firstName: req.body.firstname,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      phone: {
        phoneNumber: req.body.phone.phoneNumber,
        textCapable: req.body.phone.textCapable
      },
      address: {
        streetOne: req.body.address.streetOne,
        streetTwo: req.body.address.streetTwo,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip
      },
      image: {
        thumb: req.body.image.thumb,
        full: req.body.image.full
    },
      _creator: req.body.user._id
    };
    console.log(memberProperties);
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

  // The only purpose of this is load the page under checktoken in routes.js
  loadAddPage(req, res) {
    res.send();
  }
};
