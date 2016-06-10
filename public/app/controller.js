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
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: true

        },

        title: {
            text: 'Corrente'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 5,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto',
                style: {
                    color: 'black',
                    fontSize:'15px'
                }
            },
            title: {
                text: 'A'
            },
            plotBands: [{
                from: 0,
                to: 2,
                color: '#55BF3B' // green
            }, {
                from: 2,
                to:4.5,
                color: '#DDDF0D' // yellow
            }, {
                from: 4.5,
                to: 5,
                color: '#DF5353' // red
            }]
        },
        exporting: { enabled: false },
        series: [{
            name: 'Corrente',
            data: [0],
            tooltip: {
                valueSuffix: ' A'
            }
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
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Tensão'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 40,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto',
                    style: {
                        color: 'black',
                        fontSize:'15px'
                    }
                },
                title: {
                    text: 'V'
                },
                plotBands: [{
                    from: 0,
                    to: 10,
                    color: '#55BF3B' // green
                }, {
                    from: 10,
                    to:30,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 30,
                    to: 40,
                    color: '#DF5353' // red
                }]
            },
            exporting: { enabled: false },
            series: [{
                name: 'Tensão',
                data: [0],
                tooltip: {
                    valueSuffix: ' V'
                }
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
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: 'Potência'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 135,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto',
                        style: {
                            color: 'black',
                            fontSize:'15px'
                        }
                    },
                    title: {
                        text: 'W'
                    },
                    plotBands: [{
                        from: 0,
                        to: 50,
                        color: '#55BF3B' // green
                    }, {
                        from: 50,
                        to:100,
                        color: '#DDDF0D' // yellow
                    }, {
                        from: 100,
                        to: 135,
                        color: '#DF5353' // red
                    }]
                },
                exporting: { enabled: false },
                series: [{
                    name: 'Potência',
                    data: [0],
                    tooltip: {
                        valueSuffix: ' W'
                    }
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
