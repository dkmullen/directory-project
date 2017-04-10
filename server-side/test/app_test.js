/*jshint esversion: 6 */
const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Member = require('../models/member');
let joe;

describe('The express app', () => {
  beforeEach(done => {
    joe = new Member({
      firstName: 'Joe',
      lastName: 'Charboneau',
      phone: {
        phoneNumber: 8655555556,
        textCapable: false
      },
      email: 'joe@joe.com',
    });
    joe.save()
      .then(() => done());
  });

  it('handles a GET request to /member', (done) => {
    request(app) // Use supertest on app.js
      .get('/members') // Get req to /members
      .end((err, response) => {
        /* Test if the first object in the response matches the one we
        created, by comparing emails */
        assert(response.body[0].email === 'joe@joe.com');
        done();
      });
  });
});
