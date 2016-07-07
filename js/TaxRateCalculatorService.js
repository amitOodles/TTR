var TaxRateCalculatorService = angular.module('TaxRateCalculatorService', [])
.service('TaxRateCalculator', function (){

    var lowerBound = [0,18201,37001,80001,180001];
    var upperBound=[18200,37000,80000,180000,Infinity];
    var taxRate=[0,0.21,0.345,0.39,0.47];
    var taxBase=[0,0,3947.79,18782.445,57782.055];

    this.getTaxRate = function (input) {
        return taxRate[search(input)];
    };
    this.getTaxBase = function (input) {
        return taxBase[search(input)];
    };
    this.getLowerBoundValue= function(input){
        return lowerBound[search(input)];
    }
    function search(target){
        var index;
        for(index=0;index<5;index++){
            if(lowerBound[index]<=target && target<=upperBound[index]){
                return index;
            }
        }       
    }
});