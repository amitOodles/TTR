app.service('ChartService',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving,optimisedSS){
    document.getElementById("myChart").style.display="block";
    var ctx = $("#myChart");
    if(window.myChar !== undefined){
    myChar.destroy();
  }
    window.myChar = new Chart(ctx, {
        type: 'bar',
        backgroundColor: "#F5DEB3",
        data: {
            labels: ["THP without SS", "THP with SS", "Tax Saving", "Salary Sacrifice"],
            datasets: [{

                // label: 'Salary Sacrifice Optimistaion',
                data: [thpWithoutSS,thpWithSS,taxSaving,optimisedSS],
                backgroundColor: [
                    '#8DC6F7',
                    '#3F4247',
                    '#7CD869',
                    '#E5A45B'
                ],
                borderColor: [
                    '#cccccc',
                    '#cccccc',
                    '#cccccc',
                    '#cccccc'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        callback: function(value, index, values) {
                          if(value){
                        return "$ " + value/1000 + "k";
                      }else{
                        return "$ " + value;
                      }
                    }
                    },
                    scaleLabel: {
                        // display: true,
                        // labelString: 'probability'
                    }
                }]
            },
            tooltips:{
              callbacks: {
                    label: function(tooltipItems, data) {
                      // console.log(typeOf(tooltipItems.yLabel));
                        return  '$ ' + tooltipItems.yLabel.toFixed(2);
                    },
                    title: function(tooltipItems, data) {
                      if(tooltipItems[0].xLabel.includes("without")){
                       return "Take Home Payment Without Salary Sacrifice";
                      }
                      if(tooltipItems[0].xLabel.includes("with")){
                       return "Take Home Payment With Salary Sacrifice";
                      }
                      if(tooltipItems[0].xLabel.includes("Saving")){
                       return "Tax Savings";
                      }
                      if(tooltipItems[0].xLabel.includes("Sacrifice")){
                       return "Salary Sacrifice";
                      }
                    }
            }
          },

            legend : {
              display:false
            },
           maintainAspectRatio: true,
           responsive : true,
           title:{
             display:true,
             text:"Salary Sacrifice Optimisation"
           },
           animation :{
           duration : 1000
         }
          //  animation:{
          //    onComplete:function(){
          //      alert("gg");
          //    }
          //  }
        },
        // tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"
    });
  }
})
