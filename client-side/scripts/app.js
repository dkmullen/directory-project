/*jshint esversion: 6 */

(function() {
  var app = angular.module('directory', []);
  var baseUrl = 'http://localhost:3050';

  app.controller('MemberListController', [ '$http', function($http) {
    var directory = this;
    directory.members = [];

    $http.get(baseUrl + '/members/58f005045a8f401295742472')
      .then(function(data){
        directory.members = data;
        console.log(directory.members);
      })
      .catch(function(err){
        console.log('You got knocked the F out, man!');
      });
  }]);
})();
