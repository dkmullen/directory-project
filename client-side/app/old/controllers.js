/*jshint esversion: 6 */

(function() {
  angular.module('directoryApp') // this only retrieves the module, created in app.js

  .controller('MemberListController', [ '$scope', 'memberListFactory', function($scope, memberListFactory) {
    $scope.members = memberListFactory.query();
    console.log($scope.members);
  }]);

})();
