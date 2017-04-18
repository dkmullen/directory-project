/*jshint esversion: 6 */

angular.module('directoryApp')
  .constant('baseURL', 'http://localhost:3050/')
  .factory('memberListFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + 'members', null, {
      'read': { method: 'GET' }
    });
  }]);


