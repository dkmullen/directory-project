/*jshint esversion: 6 */
(function() {
  const app = angular.module('directory', []);

  app.controller('MemberListController', function() {
    this.member = joe;
  });

  const joe = {
    "firstName": "Joe",
    "lastName": "Charboneau",
    "dateOfBirth": null,
    "phone": {
      "phoneNumber": 8655555555,
      "textCapable": true
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
  };

})();
