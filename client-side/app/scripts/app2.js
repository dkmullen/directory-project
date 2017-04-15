/*jshint esversion: 6 */

angular.module('directoryApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // route for the home page
  .state('app', {
    url:'/',
    views: {
      'header': {
        templateUrl : 'views/header.html',
        //controller  : 'HeaderController'
      },
      'content': {
        templateUrl : 'views/home.html',
        controller  : 'MemberListController'
      },
      'footer': {
        templateUrl : 'views/footer.html',
      }
    }
  })

  // route for the member record page
  .state('app.memberview', {
    url:'members',
    views: {
      'content@': {
        templateUrl : 'views/memberview.html',
        controller  : 'MemberRecordController'
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});
