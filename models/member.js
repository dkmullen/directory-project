/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  phone: {
    phoneNumber: { type: String },
    textCapable: { type: Boolean, default: true },
  },
  email: { type: String },
  address: {
    streetOne: { type: String },
    streetTwo: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  image: {
     full: {type: String },
     thumb: { type: String}
  }
});

// Make the model, call it driver, pass in the Schema
const Member = mongoose.model('member', memberSchema);
module.exports = Member;
