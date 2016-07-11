app.controller("TTRController",['$scope','AgeCalculator','TaxRateCalculator','SGCRate','WithoutSSCalculator','WithSSCalculator',function($scope,AgeCalculator,TaxRateCalculator,SGCRate,WithoutSSCalculator,WithSSCalculator){

  // $scope.rate = SGCRate.calculateSGCRate(new Date(2011,11,11));

  $scope.dob = new Date();
  $scope.datePension = new Date();
  $scope.resultWithSS=[0,0,0];
  $scope.resultWithoutSS=[0,0,0];

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

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];
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
      $scope.age = AgeCalculator.getAge($scope.dob);
    }

    $scope.Math = window.Math

    $scope.submitForm = function(isValid){
      if(isValid){
        $scope.resultWithSS = WithSSCalculator.getResults($scope.dob,$scope.datePension,$scope.cses,$scope.beforeTTR,$scope.tfp,$scope.nra,$scope.nrp,$scope.target)
        $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.datePension,$scope.cses,$scope.beforeTTR,$scope.tfp,$scope.nra,$scope.nrp,$scope.target);
        console.log("complete");
      }else{
        console.log("has errors");
      }
    }

}]);
