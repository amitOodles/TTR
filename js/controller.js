app.controller("TTRController",['$scope','AgeCalculator','TaxRateCalculator','SGCRate','WithoutSSCalculator','WithSSCalculator','ChartService','ChartServiceHc','DonutChartServiceHc',function($scope,AgeCalculator,TaxRateCalculator,SGCRate,WithoutSSCalculator,WithSSCalculator,ChartService,ChartServiceHc,DonutChartServiceHc){

  // $scope.rate = SGCRate.calculateSGCRate(new Date(2011,11,11));

  $scope.formData = {};

  $scope.formData.dob = new Date();
  $scope.formData.datePension = new Date();
  $scope.formData.datePension.setMonth(6);
  $scope.formData.datePension.setDate(1);
  $scope.resultWithSS=[0,0,0];
  $scope.resultWithoutSS=[0,0,0];

  $scope.formData.cses = 100000;
  $scope.formData.beforeTTR = 100000;
  $scope.formData.tfp = 2;
  $scope.formData.nra = 2;
  $scope.formData.nrp = 2;
  $scope.formData.target = 100;
  $scope.excludeSGC = 80000;
  $scope.target = 40000;

  $scope.maxTHP = 0; 

  $scope.maxTHPError = false;

  $scope.csesError = false;

  $scope.thpError = false;

  $scope.csesZeroError = false;

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

    $scope.getAge = function(){
      $scope.age = AgeCalculator.getAge($scope.formData.dob);
    }

      $scope.maxTakeHomeSS = function(){
   return WithSSCalculator.getResults($scope.formData.dob,
          $scope.formData.datePension,$scope.formData.cses,$scope.formData.beforeTTR,
          $scope.formData.tfp,$scope.formData.nra,$scope.formData.nrp,$scope.formData.target,true);
  };

    $scope.Math = window.Math;

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
          ChartServiceHc.createChart(1000,500,100);
          DonutChartServiceHc.createChart(1000,500,100);

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
$scope.submitForm(true);
    $scope.overlay = false;

    $scope.$watch("formData", function(){
    $scope.unattainableTHP = false;
    $scope.attainableTHP = false;
    }, true);





}]);
