/*jshint esversion: 6 */
// Not gonna use this for the project

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseholdSchema = new Schema({
  address: {
    householdName:{
      type: String,
      required: true
    },
    streetAddressLine1: {
      type: String,
      required: true
    },
    streetAddressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: ture,
      default: 'TN'
    },
    zip: {
      type: String,
      required: true
    }
  },
  landline: {
    type: String
  },
  familyMembers: [familyMemberSchema]
});
 // Make the model, call it driver, pass in the Schema
const Household = mongoose.model('household', HouseholdSchema);

module.exports = Household;
