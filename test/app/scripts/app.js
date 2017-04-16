/*jshint esversion: 6 */
angular.module('helloworld', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
  .state('hello', {
    url: '/hello',
    template: '<h3>hello world!</h3>'
  })

  .state('about', {
    url: 'about',
    templateUrl: 'views/about.html'
  });
});
