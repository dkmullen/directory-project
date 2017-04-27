/*jshint esversion: 6 */

(function() {
  const app = angular.module('directoryApp', ['ui.router']);
  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('main', {
      url: '/',
      views: {
        'header': {
          templateUrl: '/views/header.html',
          controller: 'NavController'
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
          templateUrl: '/views/header.html',
          controller: 'NavController'
        },
        'content': {
          templateUrl: '/views/detail.html',
          controller: 'MemberRecordController'
        },
        'footer': {
          templateUrl: '/views/footer.html'
        }
      }
    })

    .state('addnew', {
      url: '/add',
      views: {
        'header': {
          templateUrl: '/views/header.html',
          controller: 'NavController'
        },
        'content': {
          templateUrl: '/views/add-record.html',
          controller: 'PostNewRecordController'
        },
        'footer': {
          templateUrl: '/views/footer.html'
        }
      }
    })

    .state('about', {
      url: '/about',
      views: {
        'header': {
          templateUrl: '/views/header.html',
          controller: 'NavController'
        },
        'content': {
          templateUrl: '/views/about.html',
        },
        'footer': {
          templateUrl: '/views/footer.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  });
})();
