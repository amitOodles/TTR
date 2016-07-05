var AgeCalculatorService = angular.module('AgeCalculatorService', [])
.service('AgeCalculator', function (){
    this.getAge = function (dateBirth,datePension) {
//       var age =  (datePension.getTime() - dateBirth.getTime()) / (365 * 24 * 60 * 60 * 1000);
// console.log(age);
// return age;

pensionYear = datePension.getFullYear();
pensionMonth = datePension.getMonth();
pensionDay = datePension.getDate();
birthYear = dateBirth.getFullYear();
birthMonth = dateBirth.getMonth();
birthDay = dateBirth.getDate();

var age = pensionYear - birthYear;

if (pensionMonth < birthMonth)
{
  age--;
}

if (birthMonth === pensionMonth && pensionDay < birthDay)
{
  age--;
}

console.log("your age is",age);

return age;

    };

});
