var wattcontroller = angular.module('wattcontroller', ['ui.bootstrap']);

wattcontroller.controller('mainCtrl',[ '$scope','$timeout','$http',function ($scope, $timeout,$http) {
  console.log('Its works!');
  // $scope.teste = "25W";
  // Function to replicate setInterval using $timeout service.
  $scope.getStatus = function(){
    time = $timeout(function() {
      updateData();
      $scope.getStatus();
    }, 200);
  };
  $scope.getStatus();

  function updateData(){
    $http({method: 'GET', url: '/upCurrent'}).
      then(function(response) {
        // console.log(JSON.stringify(response));
        $scope.corrente = response.data.value;
      }, function(response) {
        $scope.data = response.data || "Request failed";
        $scope.status = response.status;
        console.log($scope.status);
    });
    $http({method: 'GET', url: '/upVoltage'}).
      then(function(response) {
        // console.log(JSON.stringify(response));
        $scope.tensao = response.data.value;
      }, function(response) {
        $scope.data = response.data || "Request failed";
        $scope.status = response.status;
        console.log($scope.status);
    });
    $http({method: 'GET', url: '/upPower'}).
      then(function(response) {
        // console.log(JSON.stringify(response));
        $scope.potencia = response.data.value;
      }, function(response) {
        $scope.data = response.data || "Request failed";
        $scope.status = response.status;
        console.log($scope.status);
    });
  }
}]);
