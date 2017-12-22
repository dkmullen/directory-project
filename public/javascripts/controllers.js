/*jshint esversion: 6 */
/* These front-end controllers make the requests necessary to build the pages */

(() => {
  angular.module('directoryApp') // this only retrieves the module, created in app.js

  .controller('MemberListController', [ '$http', '$log', '$location', '$window',
    function($http, $log, $location, $window) {
      let directory = this;
      directory.members = [];
      /* This gets the list of members from the DB for the home view, binds it to
         directory.members. MemberListController is called from the home view.
      */
      $http.get('/members', {
        headers: { 'x-access-token': $window.sessionStorage.token }
      })
      .then((data) => {
        directory.members = data;
      })
      .catch((err) => {
        // Check for a token from MemberController on the back-end
        if(err.status === 401) {
          $location.url('/login'); //redirect to /login view
        } else {
          $log.error('Unknown error from MemberListController');
        }
      });
  }])

  .controller('MemberRecordController', [ '$http', '$scope', '$log', '$location', '$stateParams', '$window',
    function($http, $scope, $log, $location, $stateParams, $window) {
      let record = this;
      record.member = [];
      $scope.id = $stateParams.id;

      // Get a single member, bind it to record.member for detail view
      $http.get('/members/' + $scope.id, {
        headers: { 'x-access-token': $window.sessionStorage.token }
      })
      .then((data) => {
        record.member = data;
      })
      .catch((err) => {
        // Check for a token from MemberController on the back-end
        if(err.status === 401) {
          $location.url('/login'); //redirect to /login view
        } else {
          $log.error('Unknown error from MemberRecordController');
        }
      });
    }])

  .controller('UpdateRecordController', [ '$scope', '$http', '$log', '$location', '$timeout', '$window',
    function($scope, $http, $log, $location, $timeout, $window) {
      // Load the page and check for a token from MemberController on the back-end
      $http.get('/update', {
        headers: { 'x-access-token': $window.sessionStorage.token }
      })
      .catch((err) => {
        if(err.status === 401) {
          $location.url('/login');        }
        else {
          $log.error('Unknown error from EditRecordController - Status: ' + err.status);
        }
      });

      function populateRecord() {
        $http({
          method: 'GET',
          url: 'members/me',
          headers : {
            'Content-Type': 'application/json',
              'x-access-token': $window.sessionStorage.token
          }
        })
        .then((data) => {
          let my = data.data;
          console.log(my);
          if (Object.keys(my).length === 0) { // ie, if object is empty
            console.log('redirect');
          } else {
            let myRecord = {
              firstName: my.firstName || '',
              lastName: my.lastName || '',
              dateOfBirth: new Date(my.dateOfBirth),
              email: my.email || '',
              phone: {
                phoneNumber: my.phone.phoneNumber || '',
                textCapable: my.phone.textCapable || ''
              },
              address: {
                streetOne: my.address.streetOne || '',
                streetTwo: my.address.streetTwo || '',
                city: my.address.city || '',
                state: my.address.state || 'TN',
                zip: my.address.zip || ''
              },
              _id: my._id,
              image: {
                full: my.image.full || '',
                thumb: my.image.thumb || ''
              }
            };
            console.log(myRecord);
            $scope.myRecord = myRecord;
          }
        })
        .catch((err) => {
          if(err.status === 401) {
            $location.url('/login');
          } else {
            $log.error('Unknown error from UpdateRecordController on loading record - ' + err);
          }
        });
      }

      populateRecord();

      // $scope.resetform = () => {
      //   $scope.myRecord = populateRecord();
      // };

      $scope.cancel = () => {
        $location.url('/member' + $scope.myRecord._id);
      };

      // Got this from: http://jsfiddle.net/mHVWp/
      $scope.pickImage = () => {
        let input = $(document.createElement('input'));
        input.attr("type", "file");
        input.trigger('click');
        return false;
      };

      $scope.successmessage = false;
      $scope.phoneregex = '[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}';
      $scope.zipregex = '\\d{5}([ \\-]\\d{4})?';

      // Add a new member to the DB from add-record view
      $scope.updateRecord = () => {
        $http({
          method: 'PUT',
          url: 'members/' + $scope.myRecord._id,
          data: $scope.myRecord,
          headers : {
            'Content-Type': 'application/json',
              'x-access-token': $window.sessionStorage.token
          }
        })
        .then(() => {
          $location.url('/member' + $scope.myRecord._id);
        })
        .catch((err) => {
          // Might as well check again for a token before submitting the data
          if(err.status === 401) {
            $location.url('/login');
          } else {
            $log.error('Unknown error from UpdateRecordController ' + err);
          }
        });
      };
  }])
  .controller('PostNewRecordController', [ '$scope', '$http', '$log', '$location', '$timeout', '$window',
    function($scope, $http, $log, $location, $timeout, $window) {
      // Load the page and check for a token from MemberController on the back-end
      $http.get('/add', {
        headers: { 'x-access-token': $window.sessionStorage.token }
      })
      .catch((err) => {
        if(err.status === 401) {
          $location.url('/login');        }
        else {
          $log.error('Unknown error from PostNewRecordController - Status: ' + err.status);
        }
      });

      function clearRecord() {
        $http({
          method: 'GET',
          url: 'members/me',
          headers : {
            'Content-Type': 'application/json',
              'x-access-token': $window.sessionStorage.token
          }
        })
        .then((data) => {
          let my = data.data;
          console.log(my);
          if (Object.keys(my).length === 0) { // ie, if object is empty
            let myRecord = {
              firstName: '',
              lastName: '',
              // dateOfBirth: '',
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
              $scope.newRecord = myRecord;
          } else {
          let myRecord = {
            firstName: my.firstName || '',
            lastName: my.lastName || '',
            // dateOfBirth: my.dateOfBirth || '',
            email: my.email || '',
            phone: {
              phoneNumber: my.phone.phoneNumber || '',
              // textCapable: my.phone.textCapable || ''
            },
            address: {
              streetOne: my.address.streetOne || '',
              streetTwo: my.address.streetTwo || '',
              city: my.address.city || '',
              state: my.address.state,
              zip: my.address.zip || ''
              }
            };
            $scope.newRecord = myRecord;
          }

        })
        .catch((err) => {
          // Might as well check again for a token before submitting the data
          if(err.status === 401) {
            $location.url('/login');
          } else {
            $log.error('Unknown error from PostNewRecordController on loading record - ' + err);
          }
        });
      }

      clearRecord();
      $scope.clearform = () => {
        $scope.newRecord = clearRecord();
        // $scope.newRecordForm.$setPristine();
      };

      // Got this from: http://jsfiddle.net/mHVWp/
      $scope.pickImage = () => {
        let input = $(document.createElement('input'));
        input.attr("type", "file");
        input.trigger('click');
        return false;
      };

      $scope.successmessage = false;
      $scope.phoneregex = '[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}';
      $scope.zipregex = '\\d{5}([ \\-]\\d{4})?';

      // Add a new member to the DB from add-record view
      $scope.saveNewRecord = () => {
        $http({
          method: 'POST',
          url: 'members',
          data: $scope.newRecord,
          headers : {
            'Content-Type': 'application/json',
              'x-access-token': $window.sessionStorage.token
          }
        })
        .then((data) => {
          $scope.newRecord = clearRecord();
          // $scope.newRecordForm.$setPristine();
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
        .catch((err) => {
          // Might as well check again for a token before submitting the data
          if(err.status === 401) {
            $location.url('/login');
          } else {
            $log.error('Unknown error from PostNewRecordController');
          }
        });
      };
  }])

  // Determines which page we are on so nav pill can be highlighted accordingly
  .controller('NavController', ['$scope', '$http', '$state', '$window', '$log', '$location',
    function($scope, $http, $state, $window, $log, $location) {
    $scope.stateis = (currentState) => {
     return $state.is(currentState);
    };
    $scope.logOut = () => {
      $http({
        method: 'DELETE',
        url: '/users/me/token',
        headers : {
          'Content-Type': 'application/json',
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(() => {
        $log.info('Ima out');
        delete $window.sessionStorage.token;
        console.log('token is ' + $window.sessionStorage.token);
        $location.url('/login');
      })
      .catch((err) => {
        if(err.status === 401) {
          $location.url('/login');        }
        else {
          $log.error('Unknown error from logOut() in NavController - Status: ' + err);
        }
      });
    };
  }])

  .controller('LogInController', ['$scope', '$http', '$window', '$log', '$location',
    function($scope, $http, $window, $log, $location) {
      function clearRecord() {
        let blankRecord = {
          email: '',
          password: ''
          };
          return blankRecord;
      }
      $scope.errorMessage = '';
      if ($window.sessionStorage.token) {
        $location.url('/');
      }

      $scope.logInCreds = clearRecord();
      $scope.pwregex = '^.{5,}$'; // Five or more characters

      $scope.logIn = () => {
        $http({
          method: 'POST',
          url: 'auth',
          data: $scope.logInCreds,
          message: 'Success!',
          headers : { 'Content-Type': 'application/json' },
        })
        .then((data, status, headers, config) => {
          if(data.data.success === true) {
            $window.sessionStorage.token = data.data.token;
            $scope.isAuthenticated = true;
            const encodedProfile = data.data.token.split('.')[1];
            const profile = JSON.parse(url_base64_decode(encodedProfile));
            $location.url('/');
          } else {
            $scope.errorMessage = data.data.message;
          }
        })
        .catch((err) => {
          //Erase the token on failure to log in
          delete $window.sessionStorage.token;
          $scope.errorMessage = 'An error occured. Please refresh the page';
        });
      };
  }])

  .controller('SignUpController', ['$scope', '$http', '$log', '$location',
    function($scope, $http, $log, $location) {
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
      $http({
        method: 'POST',
        url: 'users',
        data: $scope.signUpCreds,
        headers : { 'Content-Type': 'application/json' }
      })
      .then((data) => {
        if(data.data.success === false) {
          $scope.errorMessage = data.data.message;
        } else {
          $location.url('/login');
        }
      })
      .catch((err) => {
        $log.error('Unknown error from SignUpController');
      });
    };
  }])

  .factory('authInterceptor', function($rootScope, $q, $window) {
    return {
      request: (config) => {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      responseError: (rejection) => {
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

  //this is used to parse the profile
  function url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }
})();
