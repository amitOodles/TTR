app.controller("TTRController",['$scope','$timeout','AgeCalculator','TaxRateCalculator','SGCRate','WithoutSSCalculator','WithSSCalculator','ChartService','ChartServiceHc','DonutChartServiceHc',function($scope,$timeout,AgeCalculator,TaxRateCalculator,SGCRate,WithoutSSCalculator,WithSSCalculator,ChartService,ChartServiceHc,DonutChartServiceHc){

  // $scope.rate = SGCRate.calculateSGCRate(new Date(2011,11,11));

  // $scope.formData = {};

  // $scope.formData.dob = new Date();
  // $scope.formData.datePension = new Date();
  // $scope.formData.datePension.setMonth(6);
  // $scope.formData.datePension.setDate(1);
  // $scope.resultWithSS=[0,0,0];
  // $scope.resultWithoutSS=[0,0,0];

  // $scope.formData.cses = 100000;
  // $scope.formData.beforeTTR = 100000;
  // $scope.formData.tfp = 2;
  // $scope.formData.nra = 2;
  // $scope.formData.nrp = 2;
  // $scope.formData.target = 100;
  // $scope.excludeSGC = 80000;
  // $scope.target = 40000;

  // $scope.maxTHP = 0; 

  // $scope.maxTHPError = false;

  // $scope.csesError = false;

  // $scope.thpError = false;

  // $scope.csesZeroError = false;

  $scope.chartOneOpen = true;
  // $scope.formData.ss = 0;
  $scope.infoShow=function(value){
    if(value){
      document.getElementsByClassName("information-overlay")[0].style.visibility="visible";
      document.getElementsByClassName("information-overlay")[0].style.zIndex="9999";
      document.getElementsByClassName("information-overlay")[0].style.position="inline-block";
      document.getElementsByClassName("information-overlay")[0].style.height =  ""+(document.getElementsByClassName("otrp-calculator")[0].clientHeight-10)+"px";
    }else{
      document.getElementsByClassName("information-overlay")[0].style.visibility="hidden";
    }
  }

  $scope.firstDP = function(){
    $scope.dateOptions.maxDate = new Date();
  }

  $scope.secondDp = function(){
    delete $scope.dateOptions.maxDate;
  }

  $scope.today = function(){
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      // dateDisabled: disabled,
      formatYear: 'yy',
      // maxDate: new Date(2020, 5, 22),
      // minDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
      $scope.firstDP();
    };

    $scope.open2 = function() {
      $scope.secondDp();
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','dd/MM/yyyy','d!/M!/yyyy'];
    $scope.format = $scope.formats[5];
    // $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }

  //   $scope.getAge = function(){
  //     $scope.age = AgeCalculator.getAge($scope.formData.dob);
  //   }

  //     $scope.maxTakeHomeSS = function(){
  //  return WithSSCalculator.getResults($scope.formData.dob,
  //         $scope.formData.datePension,$scope.formData.cses,$scope.formData.beforeTTR,
  //         $scope.formData.tfp,$scope.formData.nra,$scope.formData.nrp,$scope.formData.target,true);
  // };

    // $scope.Math = window.Math;

    $scope.unattainableTHP = false;

    $scope.attainableTHP = false;

    $scope.submitForm = function(isValid){

      if(isValid){
        $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.formData.dob,
          $scope.formData.datePension,$scope.formData.cses,$scope.formData.beforeTTR,
          $scope.formData.tfp,$scope.formData.nra,$scope.formData.nrp,$scope.formData.target);
        console.log("max thp ss is",$scope.maxTakeHomeSS());
        $scope.resultWithSS = WithSSCalculator.getResults($scope.formData.dob,
          $scope.formData.datePension,$scope.formData.cses,$scope.formData.beforeTTR,
          $scope.formData.tfp,$scope.formData.nra,$scope.formData.nrp,$scope.formData.target,false,$scope.resultWithoutSS[2]);
        $scope.unattainableTHP = $scope.resultWithSS[5];
        $scope.attainableTHP = !$scope.unattainableTHP;
        $scope.favourableDD = $scope.resultWithSS[3];
        $scope.favourableSS = $scope.resultWithSS[4];
                if($scope.attainableTHP && !$scope.unattainableTHPS){
          // ChartService.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
          ChartServiceHc.createChart(Number(resultWithoutSS[2].toFixed(2)),Number(resultWithSS[2].toFixed(2)),Number((resultWithoutSS[2] - resultWithoutSS[2]).toFixed(2)));
          DonutChartServiceHc.createChart(Number(resultWithoutSS[2].toFixed(2)),Number(resultWithSS[2].toFixed(2)),Number((resultWithoutSS[2] - resultWithoutSS[2]).toFixed(2)));
        }
        console.log($scope.resultWithSS.toString());
        console.log("complete");
      }else{
        console.log("has errors");
      }
    }

    // $scope.numArray = [];
    //
    // $scope.percentageArray = [];
    //
    // $scope.drawDownNumber = "4";
    //
    // $scope.drawDownPercent = 0.0.toFixed(2);
    //
    // for(var i = 0; i<100; i=i+5){
    //   $scope.percentageArray.push((i/100).toFixed(2));
    // }
    //
    // for(var i =4; i<=10;i++){
    //   $scope.numArray.push(i);
    // }
    //
    // // $scope.ss = 0;
    //
    // $scope.invalidContribution = false;
    //
    // $scope.maxSalarySacrifice = 0;
    //
    // // $scope.isGreaterThanCses = false;
    //
    // $scope.checkContribution = function(){
    //   // if($scope.ss > $scope.cses){
    //   //   $scope.isGreaterThanCses = true;
    //   // }
    //   var resultContribution = WithSSCalculator.checkContribution($scope.cses,$scope.dob,$scope.ss,$scope.datePension);
    //   $scope.invalidContribution = resultContribution[0];
    //   $scope.maxSalarySacrifice = resultContribution[1];
    // }
// $scope.submitForm(true);
    $scope.overlay = false;

//     $scope.$watch("formData", function(){
//     $scope.unattainableTHP = false;
//     $scope.attainableTHP = false;
//     }, true);


     $scope.age = 42;

    $scope.fy = 2016;

    $scope.cses = 80000;

    $scope.thp = 45000;

    $scope.maxTHP2 = 0;

    $scope.nra = 6;

    $scope.nrp = 7;

    $scope.tfp = 2;

    $scope.beforeTTR = 50000;

    $scope.unattainableTHP = false;

    $scope.attainableTHP = false;

    $scope.needSS = false;

    // var finalAmountSS = WithoutSSCalculator.getFinalAmount($scope.age,
    //       $scope.fy,$scope.cses,$scope.beforeTTR,
    //       $scope.tfp,$scope.nra,$scope.nrp,$scope.thp)[2];

    $scope.maxTHPSS = WithSSCalculator.getResults($scope.age,
          $scope.fy,$scope.cses,$scope.beforeTTR,
          $scope.tfp,$scope.nra,$scope.nrp,$scope.thp,true);

    $scope.submitForm2 = function(isValid){

      if(isValid){
        $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.age,
          $scope.fy,$scope.cses,$scope.beforeTTR,
          $scope.tfp,$scope.nra,$scope.nrp,$scope.thp);
        // console.log("max thp ss is",$scope.maxTakeHomeSS());
        $scope.resultWithSS = WithSSCalculator.getResults($scope.age,
          $scope.fy,$scope.cses,$scope.beforeTTR,
          $scope.tfp,$scope.nra,$scope.nrp,$scope.thp,false);
        $scope.unattainableTHP = $scope.resultWithSS[5];
        $scope.attainableTHP = !$scope.unattainableTHP;
        $scope.favourableDD = $scope.resultWithSS[3];
        $scope.favourableSS = $scope.resultWithSS[4];
        if($scope.resultWithSS[2] - $scope.resultWithoutSS[2] > 0){
          $scope.needSS = true;
        }else{
          $scope.needSS = false;
        }
                if($scope.attainableTHP && !$scope.unattainableTHPS){
          // ChartService.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
          ChartServiceHc.createChart(Number($scope.resultWithoutSS[2].toFixed(2)),Number($scope.resultWithSS[2].toFixed(2)),Number(Math.abs($scope.resultWithoutSS[2] - $scope.resultWithSS[2]).toFixed(2)));

          DonutChartServiceHc.createChart(Number($scope.resultWithoutSS[2].toFixed(2)),Number($scope.resultWithSS[2].toFixed(2)),Number(Math.abs($scope.resultWithoutSS[2] - $scope.resultWithSS[2]).toFixed(2)));

        }
        $timeout(0);
        console.log($scope.resultWithSS.toString());
        console.log("complete");
      }else{
        console.log("has errors");
      }
    }
    

    var ageSlider = document.getElementById('ageSlider'),
    fySlider = document.getElementById('fySlider'),
    csesSlider = document.getElementById('csesSlider'),
    thpSlider = document.getElementById('thpSlider'),
    tfpSlider = document.getElementById('tfpSlider'),
    nraSlider = document.getElementById('nraSlider'),
    nrpSlider = document.getElementById('nrpSlider'),
    beforeTTRSlider = document.getElementById('beforeTTRSlider');


    noUiSlider.create(ageSlider, {
     start: [$scope.age],
     range: {
      'min': [  18 ],
      'max': [ 65 ]
     },
    step : 1,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(fySlider, {
     start: [$scope.fy],
     range: {
      'min': [ 2015 ],
      'max': [ 2025 ]
     },
    step : 1,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(csesSlider, {
     start: [$scope.cses],
     range: {
      'min': [10000],
      'max': [300000]
     },
    step : 1000,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(beforeTTRSlider, {
     start: [$scope.beforeTTR],
     range: {
      'min': [0],
      'max': [ 300000 ]
     },
    step : 10000,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(thpSlider, {
     start: [$scope.thp],
     range: {
      'min': [1000],
      'max': [61000]
     },
    step : 1000,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(tfpSlider, {
     start: [$scope.tfp],
     range: {
      'min': [ 0 ],
      'max': [ 100 ]
     },
    step : 1,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(nraSlider, {
     start: [$scope.nra],
     range: {
      'min': [ 0 ],
      'max': [ 100 ]
     },
    step : 1,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    noUiSlider.create(nrpSlider, {
     start: [$scope.nra],
     range: {
      'min': [ 0 ],
      'max': [ 100 ]
     },
    step : 1,
    format: wNumb({
     decimals: 0,
    }),
    connect : 'lower'
    });

    var ageInput = document.getElementById('ageInput'),
    fyInput = document.getElementById('fyInput'),
    csesInput = document.getElementById('csesInput'),
    beforeTTRInput = document.getElementById('beforeTTRInput'),
    tfpInput = document.getElementById('tfpInput'),
    nraInput = document.getElementById('nraInput'),
    nrpInput = document.getElementById('nrpInput'),
    thpInput = document.getElementById('thpInput');

    $scope.calculateMaxTHPSS = function(){
    return WithSSCalculator.maxTakeHome($scope.age,$scope.fy,$scope.cses,$scope.beforeTTR,$scope.tfp);
    }

    $scope.changeMaxTarget = function(endValue){
    console.log(endValue);
    thpSlider.noUiSlider.updateOptions({
    range: {
      'min': 1000,
      'max': endValue - (endValue % 1000)
    },
    // step :1000,
    // start: Math.floor($scope.maxTHP2) >= $scope.thp ? $scope.thp : $scope.maxTHP2
    });
    }
    $scope.changeMaxTarget($scope.calculateMaxTHPSS());
    $scope.submitForm2(true);
    csesInput.addEventListener("change",function(){
      csesSlider.noUiSlider.set($scope.cses);
    })

    thpInput.addEventListener("change",function(){
      thpSlider.noUiSlider.set($scope.thp);
    })

    ageInput.addEventListener("change",function(){
      ageSlider.noUiSlider.set($scope.age);
    })

    fyInput.addEventListener("change",function(){
      fySlider.noUiSlider.set($scope.fy);
    })

    beforeTTRInput.addEventListener("change",function(){
      beforeTTRSlider.noUiSlider.set($scope.beforeTTR);
    })

    tfpInput.addEventListener("change",function(){
      tfpSlider.noUiSlider.set($scope.tfp);
    })

    nraInput.addEventListener("change",function(){
      nraSlider.noUiSlider.set($scope.nra);
    })

    nrpInput.addEventListener("change",function(){
      nrpSlider.noUiSlider.set($scope.nrp);
    })

    csesSlider.noUiSlider.on('set', function( values, handle ) {
    csesInput.value = values[handle];
    $scope.cses = Number(values[handle]);
    $scope.changeMaxTarget($scope.calculateMaxTHPSS());
    $scope.submitForm2(true);
    });

    ageSlider.noUiSlider.on('set', function( values, handle ) {
    ageInput.value = values[handle];
    $scope.age = Number(values[handle]);
    $scope.changeMaxTarget($scope.calculateMaxTHPSS());
    $scope.submitForm2(true);
    });

    fySlider.noUiSlider.on('set', function( values, handle ) {
    fyInput.value = values[handle];
    $scope.fy = Number(values[handle]);
    $scope.submitForm2(true);
    });

    beforeTTRSlider.noUiSlider.on('set', function( values, handle ) {
    beforeTTRInput.value = values[handle];
    $scope.beforeTTR = Number(values[handle]);
    $scope.changeMaxTarget($scope.calculateMaxTHPSS());
    $scope.submitForm2(true);
    });

    tfpSlider.noUiSlider.on('set', function( values, handle ) {
    tfpInput.value = values[handle];
    $scope.tfp = Number(values[handle]);
    $scope.changeMaxTarget($scope.calculateMaxTHPSS());
    $scope.submitForm2(true);
    });

    nraSlider.noUiSlider.on('set', function( values, handle ) {
    nraInput.value = values[handle];
    $scope.nra = Number(values[handle]);
    $scope.submitForm2(true);
    });

    nrpSlider.noUiSlider.on('set', function( values, handle ) {
    nrpInput.value = values[handle];
    $scope.nrp = Number(values[handle]);
    $scope.submitForm2(true);
    });

    thpSlider.noUiSlider.on('set', function( values, handle ) {
    thpInput.value = values[handle];
    $scope.thp = Number(values[handle]);
    $scope.submitForm2(true);
    });

    }]);
