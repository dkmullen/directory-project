/*jshint esversion: 6 */

(function() {
  angular.module('directoryApp') // this only retrieves the module, created in app.js

  .controller('MemberListController', [ '$http', function($http) {
    let directory = this;
    directory.members = [];

    /* This gets the list of members from the DB for the home view, binds it to
       directory.members. MemberListController is called from the home view.
    */
    $http.get('/members')
      .then((data) => {
        directory.members = data;
      })
      .catch((err) => {
        console.log('You got knocked out, man!');
      });
  }])

  .controller('MemberRecordController', [ '$http', '$scope', '$log', '$stateParams',
    function($http, $scope, $log, $stateParams) {
      let record = this;
      record.member = [];
      $scope.id = $stateParams.id;

      // Get a single member, bind it to record,member for detail view
      $http.get('/members/' + $scope.id)
        .then((data) => {
          record.member = data;
        })
        .catch((err) => {
          $log.error('You got knocked out, man!');
        });
    }])

    .controller('PostNewRecordController', [ '$scope', '$http', '$log', '$timeout',
      function($scope, $http, $log, $timeout) {
      $scope.success = false;
      $scope.phoneregex = '[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}';
      $scope.zipregex = '\\d{5}([ \\-]\\d{4})?';
      $scope.newRecord = {
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          email: '',
          phone: {
            phoneNumber: '',
            textCapable: ''
          },
          address: {
            streetOne: '',
            streetTwo: '',
            city: '',
            state: 'TN',
            zip: ''
          }
        };

        // Add a new member to the DB from add-record view
        $scope.saveNewRecord = function() {
          $http({
            method: 'POST',
            url: 'members',
            data: $scope.newRecord,
            headers : { 'Content-Type': 'application/json' }
          })
          .then((data) => {
            $scope.newRecord = {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                email: '',
                phone: {
                  phoneNumber: '',
                  textCapable: ''
                },
                address: {
                  streetOne: '',
                  streetTwo: '',
                  city: '',
                  state: 'TN',
                  zip: ''
                }
              };
              $scope.newRecordForm.$setPristine();
              $scope.success = true;
              $timeout(() => {
                /* We use 'apply' to add this to the watchlist so the view
                updates when this model updates */
                $scope.$apply(() => {
                  $scope.success = false;
                });
              }, 3000);
          })
          .catch((err) => {
            $log.error('You got knocked out, man!');
          });
        };
    }])

    // Determines which page we are on so nav pill can be highlighted accordingly
    .controller('NavController', ['$scope', '$state', function($scope, $state) {
      $scope.stateis = function(currentState) {
       return $state.is(currentState);
      };
    }]);

})();
