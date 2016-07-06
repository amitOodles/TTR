var TaxRateCalculatorService = angular.module('TaxRateCalculatorService', [])
.service('TaxRateCalculator', function (){

	var lowerbound = [0,18201,37001,80001,180001];
	var upperBound=[18200,37000,80000,180000,Infinity];
	var taxRate=[0,21,34.50,39,47];
	var taxBase=[0,0,3947.79,18782.445,57782.055];

    this.getTaxRate = function (input) {
		return taxRate[search(input)];
    };
    this.getTaxBase = function (input) {
		return taxBase[search(input)];
    };
    function search(target){
    	var index;
    	for(index=0;index<5;index++){
    		if(lowerbound[index]<=target && target<=upperBound[index]){
    			return index;
    		}
    	}    	
    }
});