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

  .controller('MemberRecordController', [ '$http', '$scope', '$stateParams',
    function($http, $scope, $stateParams) {
      let record = this;
      record.member = [];
      $scope.id = $stateParams.id;

      $http.get('/members/' + $scope.id)
        .then((data) => {
          record.member = data;
        })
        .catch((err) => {
          console.log('You got knocked the F out, man!');
        });
    }])

    .controller('PostNewRecordController', [ '$http', '$scope', function($http, $scope) {
        $scope.newRecord = {};

        $scope.saveNewRecord = function() {
          $http({
            method: 'POST',
            url: '/members',
            data: $scope.newRecord,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then((data) => {
            alert('Got it');
          })
          .catch((err) => {
            console.log('You got knocked the F out, man!');
          });
          //  alert('Hey now!');
        };
      }]);

})();
