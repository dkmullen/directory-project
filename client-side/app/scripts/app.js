/*jshint esversion: 6 */

(function() {
  const app = angular.module('directoryApp', ['ui.router']);
  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('main', {
      url: '/',
      views: {
        'header': {
          template : '<h3>My Header</h3>'
        },
        'content': {
          template : `<div ng-repeat="member in directory.members.data | orderBy: 'lastName'">
                <a href="members/{{member._id}}">
                <img ng-src={{member.image.thumb}} alt={{member.firstName}} />
                <h3>{{member.firstName}} {{member.lastName}}</h3></a></div>`,
        },
        'footer': {
          template: '<h3>My Footer'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  });
})();
