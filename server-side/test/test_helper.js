/*jshint esversion: 6 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  // Tell Mongoose to connect to Mongo on my machine, specifically the db called users_test
  // BTW, we don't have to create the db ahead of time!
  mongoose.connect('mongodb://localhost/directory_project_test');

  mongoose.connection
    // Once Mongo emits an event called 'open', run the 'done' callback and continue with the tests
    .once('open', () => { done(); })
    // Also watch for Mongo to emit an event called 'error', and run this function
    .on('error', (error) => {
      console.warn('Warning', error);
    });
  // 'open' and 'error' are words that are part of the Mongoose library
});

// Before each test is run by any testing module we write, clear out the database first.
beforeEach(done => {
  const { members } = mongoose.connection.collections;
  members.drop()
      .then(() => done())
      .catch(() => done()); // Catch the situation when the collection is empty
});
