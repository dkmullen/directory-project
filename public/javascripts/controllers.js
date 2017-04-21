/*jshint esversion: 6 */

(function() {
  angular.module('directoryApp') // this only retrieves the module, created in app.js

  .controller('MemberListController', [ '$http', function($http) {
    let directory = this;
    directory.members = [];

    $http.get('/members')
      .then((data) => {
        directory.members = data;
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
  }])

  .controller('MemberRecordController', [ '$http', function($http) {
    let record = this;
    record.member = [];

    $http.get('/members/:id')
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
