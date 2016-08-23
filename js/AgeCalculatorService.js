var AgeCalculatorService = angular.module('AgeCalculatorService', [])
.service('AgeCalculator', function (){
    this.getAge = function (dateBirth,financialYear) {

// var today = new Date();

var thisYear = financialYear;
var thisMonth = 6;
var thisDay = 1;
var birthYear = dateBirth.getFullYear();
var birthMonth = dateBirth.getMonth();
var birthDay = dateBirth.getDate();

var age = thisYear - birthYear;

if (thisMonth < birthMonth)
{
  age--;
}

if (birthMonth === thisMonth && thisDay < birthDay)
{
  age--;
}

return age;

    };

});
