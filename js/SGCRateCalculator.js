var SGCRateService = angular.module('SGCRateService', [])
.service('SGCRate', function (){

this.calculateSGCRate = function(pensionDate){

var rate;

if(pensionDate.getFullYear() < 2015){
  rate = 9;
}

if(pensionDate.getFullYear() <= 2021 && pensionDate.getFullYear() >= 2015){
if(pensionDate.getFullYear() === 2021 && pensionDate.getMonth() >= 6){
    rate = 10.00;
  }else{
  rate = 9.50;
}
}

if(pensionDate.getFullYear() >= 2021 && pensionDate.getFullYear() <= 2022){
if(pensionDate.getFullYear() === 2022 && pensionDate.getMonth() >= 6){
    rate = 10.50;
  }else{
  rate = 10.00;
}
}

if(pensionDate.getFullYear() >= 2022 && pensionDate. getFullYear() <= 2023){
if(pensionDate.getFullYear() === 2023 && pensionDate.getMonth() >= 6){
    rate = 11.00;
  }else{
  rate = 10.50;
}
}

if(pensionDate.getFullYear() >= 2023 && pensionDate. getFullYear() <= 2024){
if(pensionDate.getFullYear() === 2024 && pensionDate.getMonth() >= 6){
    rate = 11.50;
  }else{
  rate = 11.00;
}
}

if(pensionDate.getFullYear() >= 2024 && pensionDate. getFullYear() <= 2025){
if(pensionDate.getFullYear() === 2025 && pensionDate.getMonth() >= 6){
    rate = 12.00;
  }else{
  rate = 11.50;
}
}

if(pensionDate.getFullYear() >2025){
rate = 12.00;
}

return rate/100;
};
});
