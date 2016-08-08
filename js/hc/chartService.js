app.service('ChartServiceHc',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving){
    
    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Salary Sacrifice Optimisation'
        },
        exporting:{
            enabled:false
        },
        // subtitle: {
        //     text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
        // },
        xAxis: {
            type: 'category',
            labels:{
                autoRotation : false,
            }
        },
        yAxis: {
            title: {
                text: 'Amount ($)'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                // dataLabels: {
                //     enabled: true,
                //     format: '{point.y:.1f}%'
                // }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
            // pointFormat: '<b>$ {point.y:.2f}</b><br/>'
            pointFormatter: function(){
                return '<b>'+'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.')+'</b>';

            }
        },
        credits: {
            enabled: false
        },

        series: [{
            // name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Take Home Pay Without Salary Sacrifice',
                y: thpWithoutSS,
                // drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Take Home Pay With Salary Sacrifice',
                y: thpWithSS,
                // drilldown: 'Chrome'
            }, {
                name: 'Tax Saving',
                y: taxSaving,
                // drilldown: 'Firefox'
            }]
        }],

    });

}});
