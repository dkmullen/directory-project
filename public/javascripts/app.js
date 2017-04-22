/*jshint esversion: 6 */

(function() {
  const app = angular.module('directoryApp', ['ui.router']);
  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('main', {
      url: '/',
      views: {
        'header': {
          templateUrl: '/views/header.html'
        },
        'content': {
          templateUrl: '/views/home.html',
          controller: 'MemberListController'
        },
        'footer': {
          templateUrl: '/views/footer.html'
        }
      }
    })

    .state('detail', {
      url: '/member:id',
      views: {
        'header': {
          templateUrl: '/views/header.html'
        },
        'content': {
          templateUrl: '/views/detail.html',
          controller: 'MemberRecordController'
        },
        'footer': {
          templateUrl: '/views/footer.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  });
})();
