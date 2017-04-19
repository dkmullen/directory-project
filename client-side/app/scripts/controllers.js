/*jshint esversion: 6 */

(function() {
  const baseUrl = 'http://localhost:3050';
  angular.module('directoryApp') // this only retrieves the module, created in app.js

  .controller('MemberListController', [ '$http', function($http) {
    let directory = this;
    directory.members = [];

    $http.get(baseUrl + '/members')
      .then((data) => {
        directory.members = data;
        console.log(directory.members.data[1].lastName);
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
  }])

  .controller('MemberRecordController', [ '$http', function($http) {
    let record = this;
    record.member = [];

    $http.get(baseUrl + '/members/58f005045a8f401295742470')
      .then((data) => {
        record.member = data;
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
      this.test = function(id) {
        console.log(record.member.data._id);
      };
  }]);

})();
