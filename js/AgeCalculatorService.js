var AgeCalculatorService = angular.module('AgeCalculatorService', [])
.service('AgeCalculator', function (){
    this.getAge = function (dateBirth) {

var today = new Date();

thisYear = today.getFullYear();
thisMonth = today.getMonth();
thisDay = today.getDate();
birthYear = dateBirth.getFullYear();
birthMonth = dateBirth.getMonth();
birthDay = dateBirth.getDate();

var age = thisYear - birthYear;

if (thisMonth < birthMonth)
{
  age--;
}

if (birthMonth === thisMonth && thisDay < birthDay)
{
  age--;
}

console.log("your age is",age);

return age;

    };

});
