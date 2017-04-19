/*jshint esversion: 6 */

(function() {
  const app = angular.module('directoryApp', ['ui.router']);
  const baseUrl = 'http://localhost:3050';

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

  app.controller('MemberListController', [ '$http', function($http) {
    this.test = function(id) {
      console.log(id);
    };

    let directory = this;
    directory.members = [];

    $http.get(baseUrl + '/members')
      .then((data) => {
        directory.members = data;
        console.log(directory.members.data[1].lastName);
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
  }]);

  app.controller('MemberRecordController', [ '$http', function($http) {
    let record = this;
    record.member = [];

    $http.get(baseUrl + '/members/58f005045a8f401295742470')
      .then((data) => {
        record.member = data;
        console.log(record.member.data.firstName);
      })
      .catch((err) => {
        console.log('You got knocked the F out, man!');
      });
  }]);

})();
