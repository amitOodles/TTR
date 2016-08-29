app.service('PdfMaker', [function(){

this.createChart = function(dob,age,fy,cses,nra,tfp,beforeTTR,nrp,thp,resultWithoutSS,resultWithSS,needSS,favourableSS,favourableDD){

  var cdob = dob.toString().split(" ")[1] + " " + dob.toString().split(" ")[2] + " " + dob.toString().split(" ")[3];

  console.log(typeof resultWithoutSS[2]);

        var svgElements = $("#container").find('svg');

      //replace all svgs with a temp canvas
      svgElements.each(function() {
        var canvas, xml;

        // canvg doesn't cope very well with em font sizes so find the calculated size in pixels and replace it in the element.
        $.each($(this).find('[style*=em]'), function(index, el) {
          $(this).css('font-size', getStyle(el, 'font-size'));
        });

        canvas = document.createElement("canvas");
        canvas.className = "screenShotTempCanvas";
        //convert SVG into a XML string
        xml = (new XMLSerializer()).serializeToString(this);

        // Removing the name space as IE throws an error
        xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');

        //draw the SVG onto a canvas
        canvg(canvas, xml);
        $(canvas).insertAfter(this);
        //hide the SVG element
        ////this.className = "tempHide";
        $(this).attr('class', 'tempHide');
        $(this).hide();
      });


      html2canvas($("#container"), {
        onrendered: function(canvas) {
          var imgData = canvas.toDataURL(
            'image/png');
          var columns1 = [
          {title: "Assumptions/Details", dataKey: "name"}, 
          {title: "Values", dataKey: "country"}, 
          ];
    var rows1 = [
    { "name": "Date Of Birth", "country":cdob},
    { "name": "Age", "country": age},
    { "name": "Financial Year/Tax Year", "country": fy},
    { "name": "Current Salary Exclude Super", "country": cses},
    { "name": "Net Return In Accumulation Phase", "country": nra},
    { "name": "Tax Free Percentage Of Your Current Superannuation Balance", "country":tfp},
    { "name": "Superannuation Balance As At The Transition to Retirement Strategy Implementation Date", "country": beforeTTR},
    { "name": "Net Return In Pension Phase", "country":nrp},
    { "name": "Desired Minimum Take Home Salary Per Annum", "country":thp},
    
    ];

    var columns2 = [
          {title: "Differentiated Upon", dataKey: "name"}, 
          {title: "Without Salary Sacrifice", dataKey:"wss"},
          {title: "With Salary Sacrifice", dataKey: "ss"}, 
          ];
    var rows2 = [
          { "name": "Take Home Money", "wss":resultWithoutSS[0], "ss":resultWithSS[0]},
          { "name": "Accumulation End Balance", "wss":resultWithoutSS[1], "ss":resultWithSS[1]},
          { "name": "Final Amount", "wss":resultWithoutSS[2], "ss":resultWithSS[2]},
          ];
          
          if(needSS) 
           var columns3 = [
          {title: "You save $ " + resultWithSS[2] - resultWithoutSS[2] + " with salary sacrifice of", dataKey: "name"},  
          ];

var options = {
  theme : 'grid'
        // margin: {top: 380}
    };
          var doc = new jsPDF('p', 'pt');
          doc.setFontSize(20);
          doc.text(40, 30, "Optimisation of Transition to Retirement Pension");
          doc.setFontSize(10);
          doc.addImage(imgData, 'PNG', 150, 280);
          doc.autoTable(columns1,rows1,{
            margin:{top:50},
          });
          doc.autoTable(columns2,rows2,{
            margin:{top:580},
          });
          doc.autoTable(columns3,[],{
            margin:{top:700}
          });
          doc.text(270,825,'PAGE ' + 1);
          doc.addPage();
          
          doc.save('TTR-Results.pdf');
        }
      });

      // $("#container").find('.screenShotTempCanvas').remove();
      $("#container").find('.tempHide').show().removeClass('tempHide');

}

}]);


// $('#download').click(function() {

//     });



function getStyle(el, styleProp) {
  var camelize = function(str) {
    return str.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
  };

  if (el.currentStyle) {
    return el.currentStyle[camelize(styleProp)];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(el, null)
      .getPropertyValue(styleProp);
  } else {
    return el.style[camelize(styleProp)];
  }
}




// Only pt supported (not mm or in)
// var doc = new jsPDF('p', 'pt');
// doc.autoTable(columns, rows, {
//     styles: {fillColor: [100, 255, 255]},
//     columnStyles: {
//         id: {fillColor: 255}
//     },
//     margin: {top: 60},
//     beforePageContent: function(data) {
//         doc.text("Header", 40, 30);
//     }
// });
// doc.save('table.pdf');
