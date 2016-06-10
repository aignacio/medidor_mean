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

hero.filter('numberFixedLen', function () {
  return function (n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
          return n;
      }
      num = ''+num;
      while (num.length < len) {
          num = '0'+num;
      }
      return num;
  };
});
