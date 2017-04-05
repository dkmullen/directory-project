/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    phone: {
      phoneNumber: {
        type: Number
      },
      textCapable: {
        type: Boolean,
        default: true
      },
      email: {
        type: String
      },
      picture: {
        type: String
      }
    }
});

// Make the model, call it driver, pass in the Schema
const Member = mongoose.model('member', memberSchema);
module.exports = Member;
