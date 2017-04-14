/*jshint esversion: 6 */

(function() {
  const app = angular.module('directory', []);
  const baseUrl = 'http://localhost:3050';

  app.controller('MemberListController', [ '$http', function($http) {
    let directory = this;
    directory.members = [];

    $http.get(baseUrl + '/members')
      .then((data) => {
        directory.members = data;
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
  }]);

  app.controller('MemberRecordController', [ '$http', function($http) {
    let record = this;
    record.member = [];

    $http.get(baseUrl + '/members/58f005045a8f401295742474')
      .then((data) => {
        record.member = data;
        console.log(record.member.data.firstName);
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
  }]);
})();
