   angular.module('applicationsChartDirective', ['d3'])
    
    .directive('applicationsChart', ['d3Service', function(d3Service){
      return {
        restrict: 'AE',

        scope: {
          url: '@',
          loadingMessage: '@'
        },

        controller: ['$scope', '$http', function($scope, $http) {
              $scope.getData = function () {
                	$scope.valuesBusy=true;
                  $http({
                      url: $scope.url
                  }).success(function(jsondata) {
                      $scope.json = jsondata;
                      if($scope.json){
                        $scope.valuesBusy=false;
                        $scope.loadChart();
                      }
                  });
              }
              $scope.getData();
        }],  
            
        link: function(scope, iElement, iAttrs, ctrl) {
          scope.loadChart = function(){
              d3Service.d3().then(function(d3) {

            // d3 is the raw d3 object
                var w = 600;
                var h = 650;
                var margin = {
                    top: 40,
                    bottom: 100,
                    left: 60,
                    right: 40
                };
                
                var width = w - margin.left - margin.right;
                var height = h - margin.top - margin.bottom;
            
                var data = scope.json;

                var x = d3.scale.ordinal()
                          .domain(data.map(function(entry){
                            return entry.key;
                          }))
                          .rangeBands([0, height]);
                var y = d3.scale.linear()
                          .domain([0, d3.max(data, function(d){
                              return +d.value;
                          })])
                          .range([height, 0]);
                
            
            
                var linearColourScale = d3.scale.linear()
                                          .domain([0, data.length])
                                          .range(["#572500", "#f68026"]);
                
                var ordinalColourScale = d3.scale.category20();
                
                var xAxis = d3.svg.axis()
                              .scale(x)
                              .orient('bottom');
                
                var yAxis = d3.svg.axis()
                              .scale(y)
                              .orient('left');
                
                var svg = d3.select('body')
                            .append('svg')
                            .attr("id", "chart")
                            .attr('width', w)
                            .attr('height', h);
                
                var chart = svg.append('g')
                               .classed('display', true)
                               .attr("transform", "translate(" + margin.left + ", " + margin.top + ")" );
                
                function plot(params){
                        this.selectAll('.bar')
                        .data(params.data)
                        .enter()
                        .append('rect')
                        .classed('bar', true)
                        .attr('x', function(d, i){
                            return x(d.key);
                        })
                        .attr('y', function(d, i){
                            return y(d.value);
                        })
                        .attr('width', function(d, i){
                            return x.rangeBand();
                        })
                        .attr('height', function(d, i){
                            return height - y(d.value);
                        })
                        .style("fill", function(d, i){
                            return ordinalColourScale(i);
                        });
            
                    this.selectAll('.bar-label')
                        .data(params.data)
                        .enter()
                        .append('text')
                        .classed('bar-label', true)
                        .attr('x', function(d, i){
                            return x(d.key) + (x.rangeBand() / 2);
                        })
                        .attr('dx', 0)
                        .attr('y', function(d, i){
                            return y(d.value);
                        })
                        .attr('dy', -6)
                        .text(function(d, i){
                            return d.value;
                        });
                    
                    this.append('g')
                        .classed("x axis", true)
                        .attr('transform', "translate(" + 0 + "," + height + ")")
                        .call(xAxis)
                            .selectAll('text')
                                .style('text-anchor', 'end')
                                .attr("dx", -8)
                                .attr("dy", 8)
                                .attr('transform', 'translate(0,0) rotate(-45)');
                    
                    this.append('g')
                        .classed('y axis', true)
                        .attr('transform', "translate(0,0)")
                        .call(yAxis);
                    
                    this.select('.y.axis')
                         .append('text')
                         .attr('x', 0)
                         .attr('y', 0)
                         .style('text-anchor', 'middle')
                         .attr("transform", "translate(-50," + height / 2 + ") rotate(-90)")
                         .text('Applications Made');
                    
                     this.select('.x.axis')
                         .append('text')
                         .attr('x', 0)
                         .attr('y', 0)
                         .style('text-anchor', 'middle')
                         .attr("transform", "translate("+ width/2 + ", 80)")
                         .text('Time');
                }
                
                
            plot.call(chart, {data: data});
          });
          }
          },
          template: '<div ng-show="valuesBusy"><h3>{{loadingMessage}}</h3></div>'
        }
        
        
    }]);