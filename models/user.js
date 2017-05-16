/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  email: { type: String },
  password: { type: String },
  admin: {
    type: Boolean,
    default: false
  }
});

// Make the model, call it driver, pass in the Schema
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
