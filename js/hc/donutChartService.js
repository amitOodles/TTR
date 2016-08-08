app.service('DonutChartServiceHc',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving){

  	var total = thpWithoutSS + thpWithSS + taxSaving;

  	var thpWithSSPercentage = (thpWithSS/total) * 100;
	
	var thpWithoutSSPercentage = thpWithoutSS/total * 100; 
    
    var taxSavingPercentage = taxSaving/total * 100;

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
           text: 'Salary Sacrifice Optimisation',
            // align: 'center',
            // verticalAlign: 'middle',
             y: 25
        },
        tooltip: {
        	headerFormat: '<span style="font-weight:700; font-size:14px;">{point.key}</span><br>',
        	// color:{point.color}
            // pointFormat: '{series.name}: <b>{point.y * total}%</b>',
            pointFormatter: function(){
            	                  return '<span ></span><b>'+'Amount : $' + Highcharts.numberFormat((((this.y/100)*total).toFixed(2)),2,'.')+'</b>';

            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -40,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                size:285,
                startAngle: 90,
                endAngle: 450,
                center: ['50%', '45%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Amount',
            innerSize: '50%',
            colorByPoint:true,
            data: [
                ['THP Without Salary Sacrifice', thpWithoutSSPercentage],
                ['Tax Savings',taxSavingPercentage],
                ['THP With Salary Sacrifice', thpWithSSPercentage],
                {
                    name: 'Proprietary or Undetectable',
                    y: 0.2,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }],
        // points : [{point:{name:"bc"}},{point:{name:"bc"}},{point:{name:"bc"}},{point:{name:"bc"}}]
    });



  }
}
);