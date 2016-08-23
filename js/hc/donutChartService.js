app.service('DonutChartServiceHc',function(){
  this.createChart = function(finalWSS,finalSS,taxSaving){

    var total = finalWSS + finalSS + taxSaving;

    var finalSSPercentage = (finalSS/total) * 100;
    
    var finalWSSPercentage = finalWSS/total * 100; 
    
    var taxSavingPercentage = taxSaving/total * 100;

    // var SSPercentage = optimisedSS/total * 100;

    var length = $("#highcharts-6").width;
    // console.log(length);

    //     // Make monochrome colors and set them as default for all pies
    // Highcharts.getOptions().plotOptions.pie.colors = (function () {
    //     var colors = [],
    //         base = Highcharts.getOptions().colors[0],
    //         i;

    //     for (i = 0; i < 10; i += 1) {
    //         // Start out with a darkened base color (negative brighten), and end
    //         // up with a much brighter color
    //         colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    //     }
    //     return colors;
    // }());

    $('#donutContainer').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        exporting:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        title: {
            // enabled:false,
           text: '',
            // align: 'center',
            // verticalAlign: 'middle',
             y: 25
        },
        tooltip: {
            enabled : false,
            headerFormat: '<span style="font-weight:700; font-size:14px;">{point.key}</span><br>',
            // color:{point.color}
            // pointFormat: '{series.name}: <b>{point.y * total}%</b>',
            pointFormatter: function(){
                                  return '<span ></span><b>'+'Amount : $' + Highcharts.numberFormat((((this.y/100)*total).toFixed(2)),2,'.')+'</b>';

            }
        },
        plotOptions: {

            pie: {
                // animation:false,
                slicedOffset: 10,
                // borderWidth: 5,
                // borderColor: '#EBBA95',
                // shadow: {
                //     color: 'red', 
                //     offsetX : 0,
                //     offsetY: 0,
                //     opacity: 1,
                //     width: 3
                // },
                dataLabels: {
                    enabled: false,
                    distance: -40,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '2px 2px 2px'
                    }
                },
                
                // size:285,
                startAngle: 90,
                endAngle: 450,
                center: ['50%', '45%'],
                point: {
                events: {
                    mouseOver: function () {
                            var chart = this.series.chart;
                            // console.log(this.series.data[this.x].name);
                            if (!chart.lbl) {
                                chart.lbl = chart.renderer.label('')
                                    .attr({
                                        // padding: 10,
                                        // r: 10,
                                        // fill: Highcharts.getOptions().colors[1]
                                    })
                                    .css({
                                        color: '#000',
                                        textAlign : 'left',
                                        width: '100px',
                                        // position:'absolute'
                                    })
                                    .add();
                            }
                            chart.lbl
                                .show()
                                .attr({
                                    verticalAlign : 'middle',
                                    // horizontalAlign : 'middle', 
                                    y:(chart.chartHeight * 0.4),
                                     x:(chart.chartWidth  * 0.38),
                                    text:'<span style="font-weight:700;font-size:14px">'+ this.series.data[this.x].name + '</span></span><br><span>  $' + Highcharts.numberFormat((((this.y/100)*total).toFixed(2)),2,'.') + '</span>' 
                                    // 'x: ' + this.x + ', y: ' + this.y this.series.data[this.x].y.toFixed(2)
                                    // + '<span style="font-size:14px">' + this.series.data[this.x].y.toFixed(2) + 
                                });
                                var point = this,
                                points = this.series.points;

                            // unslice sliced element(s)
                            for (var key in points) {
                                if (points[key].sliced) {
                                    points[key].slice(false);
                                }
                            }

                            // slice hovered element
                            if (!point.selected) {
                                point.slice(true);
                            }
                        }, 
                         mouseOut: function() {
                            var chart = this.series.chart;
                            var point = this,
                                points = this.series.points;
                        // unslice sliced element(s)
                        for (var key in points) {
                            if (points[key].sliced) {
                                points[key].slice(false);
                            }
                        }
                        chart.lbl
                                .show()
                                .attr({
                                    // verticalAlign : 'middle',
                                    // horizontalAlign : 'middle', 
                                     y:(chart.chartHeight * 0.4),
                                     // chart.plotTop  + (chart.plotHeight * 0.4)
                                     x:(chart.chartWidth  * 0.38),
                                    text:'<span style="font-weight:700; font-size:14px;">'  + 'Transition to Retirement' 
                                    + '</span>'
                                });
                    }
                        //$(chart.container).width()
                }
                }
            }
        },
        series: [{
            type: 'pie',
            // name: 'Amount',
            innerSize: '70%',
            // outerSize:'60%',
            colorByPoint:true,
            data: [
                ['Final Amount Without Salary Sacrifice', finalWSSPercentage],
                ['Final Amount With Salary Sacrifice', finalSSPercentage],
                ['Tax Savings',taxSavingPercentage]
                // ['Salary Sacrifice', SSPercentage],
            ]
        }]
    },function (chart) {
         //Second
        chart.lbl = chart.renderer.label('')
                                    .attr({
                                        // padding: 10,
                                        // r: 10,
                                        // fill: Highcharts.getOptions().colors[1]
                                    })
                                    .css({
                                        color: '#000',
                                        textAlign : 'left',
                                        width: '100px',
                                        // left : '100px'
                                        // position:'absolute'
                                    })
                                    .add();

                                     chart.lbl
                                .show()
                                .attr({
                                    // verticalAlign : 'middle',
                                    // horizontalAlign : 'middle', 
                                     y:(chart.chartHeight * 0.4),
                                     // chart.plotTop  + (chart.plotHeight * 0.4)
                                     x:(chart.chartWidth  * 0.38),
                                    text:'<span style="font-weight:700; font-size:14px;">'  + 'Transition to Retirement' 
                                    + '</span>'
                                });

    });



  }
}
);