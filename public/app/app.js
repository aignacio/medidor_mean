var hero = angular.module('superhero', ['ui.bootstrap',
                                        'ngRoute',
                                        'wattcontroller']);
hero.config(['$controllerProvider',
  function($controllerProvider) {
    $controllerProvider.allowGlobals();
  }
]);

hero.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/index.html',
      controller: ''
    }).
    otherwise({
      redirectTo: '/',
      controller: ''
    });
}]);
