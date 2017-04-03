/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
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
      }
    }
});

module.exports = familyMemberSchema;
