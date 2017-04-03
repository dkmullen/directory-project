/*jshint esversion: 6 */
// This file contains instruction about what to do with incoming routes.

const Household = require('../models/household');

module.exports = {
  getall(req, res, next) {
    Household.find({})
      .then(household => res.send(household))
      .catch(next);
  },

  create(req, res, next) {
    const householdProperties = req.body;

    Household.create(householdProperties)
      .then(household => res.send(household))
      .catch(next); // in case of err, run the next thing, don't hang up here
  },

  getone(req, res, next) {
    const householdId = req.params.id;
    Household.findById({ _id: householdId})
      .then(household => res.send(household))
      .catch(next);
  },

  edit(req, res, next) {
    // id matches :id from routes.js put method, carried in on params
    const householdId = req.params.id;
    // request body contains driver properties
    const householdProperties = req.body;

    Household.findByIdAndUpdate({ _id: householdId }, householdProperties) // update Household with new properties
      .then(() => Household.findById({ _id: householdId })) // find the updated Household
      .then(household => res.send(household)) // send it along
      .catch(next);
  },

  delete(req, res, next) {
    // id matches :id from routes.js put method, carried in on params
    const householdId = req.params.id;
    // request body contains driver properties
    const householdProperties = req.body;

    Household.findByIdAndRemove({ _id: householdId }) // update Household with new properties
      .then(household => res.status(204).send(household)) // send it along
      .catch(next);
  }
};
