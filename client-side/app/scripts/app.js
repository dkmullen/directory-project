/*jshint esversion: 6 */
angular.module('directoryApp', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('main', {
    url: '/',
    views: {
      'header': {
        templateUrl : 'views/header.html'
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
  .state('details', {
    url:'members/:id',
    views: {
      'content@': {
        templateUrl : 'views/detail.html',
        controller  : 'MemberRecordController'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
