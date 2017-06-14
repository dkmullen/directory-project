/*jshint esversion: 6 */
/* These front-end controllers make the requests necessary to build the pages */

(() => {

  angular.module('directoryApp') // this only retrieves the module, created in app.js

  .controller('MemberListController', [ '$http', '$log', '$location',
    function($http, $log, $location) {
      let directory = this;
      directory.members = [];

      /* This gets the list of members from the DB for the home view, binds it to
         directory.members. MemberListController is called from the home view.
      */
      $http.get('/members')
        .then((data) => {
          directory.members = data;
        })
        // Check for a token from MemberController on the back-end
        .catch((err) => {
          if(err.status === 401) {
            $location.url('/login'); //redirect to /login view
          }
          else {
            $log.error('Unknown error');
          }
        });
  }])

  .controller('MemberRecordController', [ '$http', '$scope', '$log', '$location', '$stateParams',
    function($http, $scope, $log, $location, $stateParams) {
      let record = this;
      record.member = [];
      $scope.id = $stateParams.id;

      // Get a single member, bind it to record,member for detail view
      $http.get('/members/' + $scope.id)
        .then((data) => {
          record.member = data;
        })
        // Check for a token from MemberController on the back-end
        .catch((err) => {
          if(err.status === 401) {
            $location.url('/login');
          }
          else {
            $log.error('Unknown error');
          }
        });
    }])

  .controller('PostNewRecordController', [ '$scope', '$http', '$log', '$location', '$timeout',
    function($scope, $http, $log, $location, $timeout) {
      // Load the page and check for a token from MemberController on the back-end
      $http.get('/add')
        .catch((err) => {
          if(err.status === 401) {
            $location.url('/login');        }
          else {
            $log.error('Unknown error');
          }
        });
      function clearRecord() {
        let blankRecord = {
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
          return blankRecord;
      }
      $scope.newRecord = clearRecord();
      $scope.successmessage = false;
      $scope.phoneregex = '[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}';
      $scope.zipregex = '\\d{5}([ \\-]\\d{4})?';

      // Add a new member to the DB from add-record view
      $scope.saveNewRecord = () => {
        $http({
          method: 'POST',
          url: 'members',
          data: $scope.newRecord,
          headers : { 'Content-Type': 'application/json' }
        })
        .then((data) => {
          $scope.newRecord = clearRecord();
          $scope.newRecordForm.$setPristine();
          $scope.successmessage = true;
          $timeout(() => {
            /* We use 'apply' to add this to the watchlist so the view
            updates when this model updates. This causes the success message to
            appear for 3 seconds after user posts, then disapper. */
            $scope.$apply(() => {
              $scope.successmessage = false;
            });
          }, 3000);
        })
        // Might as well check again for a token before submitting the data
        .catch((err) => {
          if(err.status === 401) {
            $location.url('/login');
          }
          else {
            $log.error('Unknown error from LogInController');
          }
        });
      };
      $scope.clearform = () => {
        $scope.newRecord = clearRecord();
        $scope.newRecordForm.$setPristine();
      };
  }])

  .controller('LogInController', ['$scope', '$http', '$log', function($scope, $http, $log) {
    function clearRecord() {
      let blankRecord = {
        email: '',
        password: ''
        };
        return blankRecord;
    }
    $scope.logInCreds = clearRecord();
    $scope.pwregex = '^.{5,}$'; // Five or more characters
    $scope.logIn = () => {
      $http({
        method: 'POST',
        url: 'auth',
        data: $scope.logInCreds,
        message: console.log($scope.logInCreds),
        headers : { 'Content-Type': 'application/json' },
        message2: console.log($http.method)
      });
    };
  }])

  .controller('SignUpController', ['$scope', '$http', '$log', function($scope, $http, $log) {
    function clearRecord() {
      let blankRecord = {
        name: '',
        email: '',
        password: '',
        password2: ''
        };
        return blankRecord;
    }
    $scope.signUpCreds = clearRecord();
    $scope.pwregex = '^.{5,}$'; // Five or more characters
    $scope.signUp = () => {
      $log.info($scope.signUpCreds);
      $http({
        method: 'POST',
        url: 'users', // this is wrong
        data: $scope.signUpCreds,
        headers : { 'Content-Type': 'application/json' }
      });
    };
  }])

  // Determines which page we are on so nav pill can be highlighted accordingly
  .controller('NavController', ['$scope', '$state', function($scope, $state) {
    $scope.stateis = (currentState) => {
     return $state.is(currentState);
    };
  }]);
})();
