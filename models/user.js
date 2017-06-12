/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  token: { type: String },
  admin: {
    type: Boolean,
    default: false
  }
});

// User.plugin(passportLocalMongoose);

// Make the model, call it UserSchema, pass in the Schema
module.exports = mongoose.model('User', UserSchema);
