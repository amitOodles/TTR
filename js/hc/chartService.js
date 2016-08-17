app.service('ChartServiceHc',function(){
  this.createChart = function(finalWSS,finalSS,taxSaving){
    
    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Transition to Retirement'
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
            colorByPoint: true,
            data: [{
                name: 'Final Amount Without Salary Sacrifice',
                y: finalWSS,
            }, {
                name: 'Final Amount With Salary Sacrifice',
                y: finalSS,
            }, {
                name: 'Tax Saving',
                y: taxSaving,
            }]
        }],

    });

}});
