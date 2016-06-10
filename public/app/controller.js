var wattcontroller = angular.module('wattcontroller', ['ui.bootstrap']);


wattcontroller.controller('mainCtrl',[ '$scope','$timeout','$http',function ($scope, $timeout,$http) {
  console.log('TESTE');
  // $scope.teste = "25W";
  // Function to replicate setInterval using $timeout service.
  $scope.getStatus = function(){
    time = $timeout(function() {
      updateData();
      // $scope.filipe = $scope.filipe +1;
      $scope.getStatus();
    }, 500);
  };
  $scope.getStatus();
  $scope.filipe = 0;

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
    //$scope.potencia = $scope.tensao * $scope.corrente;
    // $http({method: 'GET', url: '/upPower'}).
    //   then(function(response) {
    //     // console.log(JSON.stringify(response));
    //     $scope.potencia = response.data.value;
    //   }, function(response) {
    //     $scope.data = response.data || "Request failed";
    //     $scope.status = response.status;
    //     console.log($scope.status);
    // });
  }

  $(function () {
    $('#corrente').highcharts({
      chart: {

                  type: 'gauge',
                  plotBorderWidth: 0,
                  plotBackgroundColor: {
                      linearGradient: { x1: 0, y1: 0 },
                      stops: [
                          [0, 'white'],
                          [0.3, 'white'],
                          [1, 'white']
                      ]
                  },
                  plotBackgroundImage: null,
                  height: 500
              },

              title: {
                  text: 'Corrente'
              },

              pane: [{
                  startAngle: -60,
                  endAngle: 60,
                  background: null,
                  center: ['50%', '50%'],
                  size: 350
              }],

              tooltip: {
                  enabled: false
              },
               exporting: { enabled: false },

              yAxis: [{
                  min: 0,
                  max: 5,
                  minorTickPosition: 'outside',
                  minorTickInterval: 'auto',

                  tickPosition: 'outside',
                  labels: {
                      rotation: 'auto',
                      distance: 20
                  },
                  plotBands: [{
                      from: 4.5,
                      to: 5,
                      color: '#C02316',
                      innerRadius: '100%',
                      outerRadius: '105%'
                  }],
                  pane: 0,
                  title: {
                      text: '<br/><span style="font-size:20px">Corrente (A)</span>',
                      y: 0
                  }
              }],

              plotOptions: {
                  gauge: {
                      dataLabels: {
                          enabled: false
                      },
                      dial: {
                          radius: '100%'
                      }
                  }
              },


              series: [{
                  name: 'Channel A',
                  data: [0],
                  yAxis: 0
              }]

          },

        function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0];
                point.update($scope.corrente);

            }, 250);
        }
        });

        $('#tensao').highcharts({
          chart: {

                      type: 'gauge',
                      plotBorderWidth: 0,
                      plotBackgroundColor: {
                          linearGradient: { x1: 0, y1: 0 },
                          stops: [
                              [0, 'white'],
                              [0.3, 'white'],
                              [1, 'white']
                          ]
                      },
                      plotBackgroundImage: null,
                      height: 500
                  },

                  title: {
                      text: 'Tensão'
                  },

                  pane: [{
                      startAngle: -60,
                      endAngle: 60,
                      background: null,
                      center: ['50%', '50%'],
                      size: 350
                  }],

                  tooltip: {
                      enabled: false
                  },
                   exporting: { enabled: false },

                  yAxis: [{
                      min: 0,
                      max: 40,
                      minorTickPosition: 'outside',
                      minorTickInterval: 'auto',

                      tickPosition: 'outside',
                      labels: {
                          rotation: 'auto',
                          distance: 20
                      },
                      plotBands: [{
                          from: 30,
                          to: 40,
                          color: '#C02316',
                          innerRadius: '100%',
                          outerRadius: '105%'
                      }],
                      pane: 0,
                      title: {
                          text: '<br/><span style="font-size:20px">Tensão (V)</span>',
                          y: 0
                      }
                  }],

                  plotOptions: {
                      gauge: {
                          dataLabels: {
                              enabled: false
                          },
                          dial: {
                              radius: '100%'
                          }
                      }
                  },


                  series: [{
                      name: 'Channel A',
                      data: [0],
                      yAxis: 0
                  }]

              },
            function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0];
                    point.update($scope.tensao);

                }, 250);
            }
            });

            $('#potencia').highcharts({
              chart: {

                          type: 'gauge',
                          plotBorderWidth: 0,
                          plotBackgroundColor: {
                              linearGradient: { x1: 0, y1: 0 },
                              stops: [
                                  [0, 'white'],
                                  [0.3, 'white'],
                                  [1, 'white']
                              ]
                          },
                          plotBackgroundImage: null,
                          height: 500
                      },

                      title: {
                          text: 'Potência'
                      },

                      pane: [{
                          startAngle: -60,
                          endAngle: 60,
                          background: null,
                          center: ['50%', '50%'],
                          size: 350
                      }],

                      tooltip: {
                          enabled: false
                      },
                       exporting: { enabled: false },

                      yAxis: [{
                          min: 0,
                          max: 150,
                          minorTickPosition: 'outside',
                          minorTickInterval: 'auto',

                          tickPosition: 'outside',
                          labels: {
                              rotation: 'auto',
                              distance: 20
                          },
                          plotBands: [{
                              from: 135,
                              to: 150,
                              color: '#C02316',
                              innerRadius: '100%',
                              outerRadius: '105%'
                          }],
                          pane: 0,
                          title: {
                              text: '<br/><span style="font-size:20px">Potência (W)</span>',
                              y: 0
                          }
                      }],

                      plotOptions: {
                          gauge: {
                              dataLabels: {
                                  enabled: false
                              },
                              dial: {
                                  radius: '100%'
                              }
                          }
                      },


                      series: [{
                          name: 'Channel A',
                          data: [0],
                          yAxis: 0
                      }]

                  },

                function (chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0];
                        // potencia = Number()*Number($scope.corrente);
                        point.update($scope.tensao*$scope.corrente);

                    }, 250);
                }
                });
  });
}]);
