/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  token: { type: String }
});

// Make the model, call it driver, pass in the Schema
const User = mongoose.model('user', userSchema);
module.exports = User;
