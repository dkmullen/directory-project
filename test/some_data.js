/*jshint esversion: 6 */
const joe = new Member(
  {
  "firstName": "Joe",
  "lastName": "Charboneau",
  "dateOfBirth": null,
  "phone": {
    "phoneNumber": 8655555555,
    "textCapable": false
  },
  "email": "joe@joe.com",
  "address": {
    "streetOne": "6 Rustic Drive",
    "streetTwo": null,
    "city": "Killbuck",
    "state": "CO",
    "zip": "88858"
  },
  "picture": "../img/joe.jpg"
  }
);

const jane = new Member(
  {
  "firstName": "Jane",
  "lastName": "Err",
  "dateOfBirth": null,
  "phone": {
    "phoneNumber": 3035555555,
    "textCapable": true
  },
  "email": "jane@example.com",
  "address": {
    "streetOne": "3220 County Rd. 57",
    "streetTwo": "In da hood",
    "city": "Glenmont",
    "state": "FL",
    "zip": "88555"
  },
  "picture": "../img/jane.jpg"
  }
);
