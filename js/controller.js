app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'TaxRateCalculator', 'SGCRate', 'WithoutSSCalculator', 'WithSSCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker', function($scope, $timeout, AgeCalculator, TaxRateCalculator, SGCRate, WithoutSSCalculator, WithSSCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    $('#tooltip').tooltip();
    $('#tooltip1').tooltip();

    var dt = new Date();

    $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;

    var nd = new Date();
    nd.setYear($scope.fy);
    nd.setMonth(6);
    nd.setDate(1);
    var initDate = nd;
    initDate.setYear(1970);
    $scope.dob = initDate;
    $scope.chartOneOpen = true;
    $scope.infoShow = function(value) {
        if (value) {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "visible";
            document.getElementsByClassName("information-overlay")[0].style.zIndex = "9999";
            document.getElementsByClassName("information-overlay")[0].style.position = "inline-block";
            document.getElementsByClassName("information-overlay")[0].style.height = "" + (document.getElementsByClassName("otrp-calculator")[0].clientHeight - 10) + "px";
        } else {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "hidden";
        }
    }

    $scope.firstDP = function() {
        $scope.dateOptions.maxDate = new Date($scope.fy - 18, 5, 30);
        $scope.dateOptions.minDate = new Date(1950, 0, 1);
    }

    $scope.secondDp = function() {
        delete $scope.dateOptions.maxDate;
    }

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        // minDate: initDate,
        showWeeks: true
    };

    $scope.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yy',
        // maxDate: new Date(2020, 5, 22),
        // minDate: initDate,
        startingDay: 1,
        showWeeks: false
    };

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

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy', 'd!/M!/yyyy'];
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
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }


    $scope.overlay = false;

    $scope.forms = {};

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

    $scope.personalDetails = {};

    $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);

    $scope.maxTHPSS = WithSSCalculator.getResults($scope.age,
        $scope.fy, $scope.cses, $scope.beforeTTR,
        $scope.tfp, $scope.nra, $scope.nrp, $scope.thp, true);

    $scope.submitForm2 = function(isValid) {

        if (isValid) {

            var cses1 = $scope.cses.replace("$", "").replace(",", "");
            var beforeTTR1 = $scope.beforeTTR.replace("$", "").replaceAll(",", "");
            var tfp1 = $scope.tfp.replace("%", "").replace(",", "");
            var nra1 = $scope.nra.replace("%", "").replace(",", "");
            var nrp1 = $scope.nrp.replace("%", "").replace(",", "");
            var thp1 = $scope.thp.replace("$", "").replace(",", "");

            /*Number(cses1),Number(beforeTTR1),Number(tfp1),Number(nra1),Number(nrp1),Number(thp1)*/

            $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.age, $scope.fy, Number(cses1), Number(beforeTTR1),
                Number(tfp1), Number(nra1), Number(nrp1), Number(thp1));
            // console.log("max thp ss is",$scope.maxTakeHomeSS());
            $scope.resultWithSS = WithSSCalculator.getResults($scope.age,
                $scope.fy, Number(cses1), Number(beforeTTR1), Number(tfp1), Number(nra1), Number(nrp1), Number(thp1), false);
            $scope.unattainableTHP = $scope.resultWithSS[5];
            $scope.attainableTHP = !$scope.unattainableTHP;
            $scope.favourableDD = $scope.resultWithSS[3];
            $scope.favourableSS = $scope.resultWithSS[4];
            if ($scope.resultWithSS[2] - $scope.resultWithoutSS[2] > 0) {
                $scope.needSS = true;
            } else {
                $scope.needSS = false;
            }
            if ($scope.attainableTHP && !$scope.unattainableTHPS) {
                // ChartService.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
                ChartServiceHc.createChart(Number($scope.resultWithoutSS[2].toFixed(2)), Number($scope.resultWithSS[2].toFixed(2)), Number(Math.abs($scope.resultWithoutSS[2] - $scope.resultWithSS[2]).toFixed(2)));

                // DonutChartServiceHc.createChart(Number($scope.resultWithoutSS[2].toFixed(2)), Number($scope.resultWithSS[2].toFixed(2)), Number(Math.abs($scope.resultWithoutSS[2] - $scope.resultWithSS[2]).toFixed(2)));

            }
            $timeout(0);
            /*console.log($scope.resultWithSS.toString());
            console.log("complete");*/
        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }

    }


    // var ageSlider = document.getElementById('ageSlider'),
    var fySlider = document.getElementById('fySlider'),
        csesSlider = document.getElementById('csesSlider'),
        thpSlider = document.getElementById('thpSlider'),
        tfpSlider = document.getElementById('tfpSlider'),
        nraSlider = document.getElementById('nraSlider'),
        nrpSlider = document.getElementById('nrpSlider'),
        beforeTTRSlider = document.getElementById('beforeTTRSlider');

    noUiSlider.create(fySlider, {
        start: [$scope.fy],
        range: {
            'min': [2016],
            'max': [2099]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: 'lower'
    });

    noUiSlider.create(csesSlider, {
        start: [$scope.cses],
        range: {
            'min': [10000],
            'max': [300000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(beforeTTRSlider, {
        start: [$scope.beforeTTR],
        range: {
            'min': [0],
            'max': [3000000]
        },
        step: 1000,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(thpSlider, {
        start: [$scope.thp],
        range: {
            'min': [1000],
            'max': [61000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(tfpSlider, {
        start: [$scope.tfp],
        range: {
            'min': [0],
            'max': [100]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
            postfix: '%',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(nraSlider, {
        start: [$scope.nra],
        range: {
            'min': [0],
            'max': [100]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
            postfix: '%',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(nrpSlider, {
        start: [$scope.nrp],
        range: {
            'min': [0],
            'max': [100]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
            postfix: '%',
            thousand: ','
        }),
        connect: 'lower'
    });


    var ageInput = document.getElementById('ageInput'),
        fyInput = document.getElementById('fyInput'),
        csesInput = document.getElementById('csesInput'),
        beforeTTRInput = document.getElementById('beforeTTRInput'),
        tfpInput = document.getElementById('tfpInput'),
        nraInput = document.getElementById('nraInput'),
        nrpInput = document.getElementById('nrpInput'),
        thpInput = document.getElementById('thpInput');


    csesSlider.noUiSlider.on('update', function(values, handle) {
        csesInput.value = values[handle];
        $scope.cses = (values[handle]);
    });
    beforeTTRSlider.noUiSlider.on('update', function(values, handle) {
        beforeTTRInput.value = values[handle];
        $scope.beforeTTR = (values[handle]);
    });
    thpSlider.noUiSlider.on('update', function(values, handle) {
        thpInput.value = values[handle];
        $scope.thp = (values[handle]);
    });
    tfpSlider.noUiSlider.on('update', function(values, handle) {
        tfpInput.value = values[handle];
        $scope.tfp = (values[handle]);
    });
    nraSlider.noUiSlider.on('update', function(values, handle) {
        nraInput.value = values[handle];
        $scope.nra = (values[handle]);
    });
    nrpSlider.noUiSlider.on('update', function(values, handle) {
        nrpInput.value = values[handle];
        $scope.nrp = (values[handle]);
    });


    $scope.calculateMaxTHPSS = function() {
        var cses1 = $scope.cses.replace("$", "").replace(",", "");
        var beforeTTR1 = $scope.beforeTTR.replace("$", "").replaceAll(",", "");
        var tfp1 = $scope.tfp.replace("%", "").replace(",", "");
        var nra1 = $scope.nra.replace("%", "").replace(",", "");
        var nrp1 = $scope.nrp.replace("%", "").replace(",", "");
        var thp1 = $scope.thp.replace("$", "").replace(",", "");
        return WithSSCalculator.maxTakeHome($scope.age, $scope.fy, Number(cses1), Number(beforeTTR1), Number(tfp1));
    }

    $scope.changeMaxTarget = function(endValue) {
        thpSlider.noUiSlider.updateOptions({
            range: {
                'min': 1000,
                'max': endValue - (endValue % 1000)
            }
        });
    }
    $scope.changeMaxTarget($scope.calculateMaxTHPSS());
    $scope.submitForm2(true);

    $scope.ageChange = function() {
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-9])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);

        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dob = fd;
        } else {
            $scope.dob = initDate;
        }
        $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
        $scope.changeMaxTarget($scope.calculateMaxTHPSS());
        // $scope.submitForm2(true);
    }

    fySlider.noUiSlider.on('update', function(values, handle) {
        fyInput.value = values[handle];
        $scope.fy = Number(values[handle]);
    });

    csesInput.addEventListener("change", function() {
        csesSlider.noUiSlider.set($scope.cses);
    })

    thpInput.addEventListener("change", function() {
        thpSlider.noUiSlider.set($scope.thp);
    })


    fyInput.addEventListener("change", function() {
        if (this.value < 2016) {
            $scope.fy = 2016;
        }
        fySlider.noUiSlider.set($scope.fy);
    })

    beforeTTRInput.addEventListener("change", function() {
        beforeTTRSlider.noUiSlider.set($scope.beforeTTR);
    })

    tfpInput.addEventListener("change", function() {
        tfpSlider.noUiSlider.set($scope.tfp);
    })

    nraInput.addEventListener("change", function() {
        nraSlider.noUiSlider.set($scope.nra);
    })

    nrpInput.addEventListener("change", function() {
        nrpSlider.noUiSlider.set($scope.nrp);
    })

    csesSlider.noUiSlider.on('set', function(values, handle) {
        csesInput.value = values[handle];
        $scope.cses = (values[handle]);
        $scope.changeMaxTarget($scope.calculateMaxTHPSS());
        // $scope.submitForm2(true);
    });

    fySlider.noUiSlider.on('set', function(values, handle) {
        fyInput.value = values[handle];
        $scope.fy = Number(values[handle]);
        $scope.ageChange();
        // $scope.submitForm2(true);
    });

    beforeTTRSlider.noUiSlider.on('set', function(values, handle) {
        beforeTTRInput.value = values[handle];
        $scope.beforeTTR = (values[handle]);
        $scope.changeMaxTarget($scope.calculateMaxTHPSS());
        // $scope.submitForm2(true);
    });

    tfpSlider.noUiSlider.on('set', function(values, handle) {
        tfpInput.value = values[handle];
        $scope.tfp = (values[handle]);
        $scope.changeMaxTarget($scope.calculateMaxTHPSS());
        // $scope.submitForm2(true);
    });

    nraSlider.noUiSlider.on('set', function(values, handle) {
        nraInput.value = values[handle];
        $scope.nra = (values[handle]);
        // $scope.submitForm2(true);
    });

    nrpSlider.noUiSlider.on('set', function(values, handle) {
        nrpInput.value = values[handle];
        $scope.nrp = (values[handle]);
        // $scope.submitForm2(true);
    });

    thpSlider.noUiSlider.on('set', function(values, handle) {
        thpInput.value = values[handle];
        $scope.thp = (values[handle]);
        // $scope.submitForm2(true);
    });

    document.getElementById("download").addEventListener("click", function() {
        if ($scope.forms.ttrForm.$valid) {
            var toggleNeeded = false;
            document.getElementById("container").classList.toggle("largeWidth");
            if (!$scope.chartOneOpen) {
                document.getElementById("container").classList.toggle("ng-hide");

                toggleNeeded = true;
            }
            PdfMaker.createChart($scope.personalDetails, $scope.dob, $scope.age, $scope.fy, $scope.cses, $scope.nra, $scope.tfp, $scope.beforeTTR, $scope.nrp, $scope.thp, $scope.resultWithoutSS, $scope.resultWithSS, $scope.needSS, $scope.favourableSS, $scope.favourableDD, toggleNeeded);
        } else {
            $("#myModal").modal('show');
        }
    });

    $(".print-doc").on("click", function() {
        if ($scope.forms.ttrForm.$valid) {
            print();
        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");

        }
    })

}]);
