/*jshint esversion: 6 */
const assert = require('assert'); // Gives us a global command 'assert'
const Member = require('../models/member'); // Import the class of all members

describe('Creating new member records', () => {
  it('creates and saves a new member', (done) => {
    const joe = new Member({
      firstName: 'Joe',
      lastName: 'Charboneau',
      dateOfBirth: null,
      phone: {
        phoneNumber: 8655555555,
        textCapable: false
      },
      email: 'joe@joe.com',
      address: {
        streetOne: '6 Rustic Drive',
        streetTwo: null,
        city: 'Killbuck',
        state: 'CO',
        zip: '88858'
      },
      picture: '../img/joe.jpg'
    });
    joe.save()
      .then(() => {
        assert(!joe.isNew);
        done();
      });
  });
});

/* Has Joe been saved successfully? When Mongoose creates a new model,
   it has the property isNew until it is saved to the db. So we test it
   with assert(!joe.isNew);. */
