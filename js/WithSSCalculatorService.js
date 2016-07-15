//var WithSSCalculatorService = angular.module('WithSSCalculatorService', [])
app.service('WithSSCalculator', ['TaxRateCalculator','SGCRate','AgeCalculator',function (TaxRateCalculator,SGCRate,AgeCalculator){
    this.getResults = function(dob,datePension,currentSalaryExcludeSuper,beforeTTR,
      taxFreePercent,netReturnInAccumulation,netReturnInPension,minTakeHomePay){
        var financialYear=datePension.getFullYear()+1;

        var nrpSqrt = Math.sqrt(1 + (netReturnInPension/100)) - 1;

        var cses =  currentSalaryExcludeSuper;

        var age = AgeCalculator.getAge(dob);

        var concessionalContributionCap ;

        if(age < 49){
          concessionalContributionCap = 30000;
        }else{
          concessionalContributionCap = 35000;
        }

        var accumulationBeginningBalance = 0;

        var concessionalContributionTax = 0.15;

        var excessContributionTax = 0.32;

        var totalEmployerContribution = SGCRate.calculateSGCRate(datePension)*cses;

        var validEmployerContribution;

        var upperSS;

        if(totalEmployerContribution >= 19307.80){
          validEmployerContribution = 19307.80;
        }else{
          validEmployerContribution = totalEmployerContribution;
        }

        upperSS = concessionalContributionCap - validEmployerContribution;

        //console.log(upperSS);

        var pensionStartBalance = beforeTTR;

        var assesablePensionIncome;

        var taxableIncome;

        var tmLevi;

        var rebate;

        var afterTaxIncome;

        var exemptPensionIncome;

        var takeHomePayment;

        var drawdownValue;

        var changeSS = true;

        var maxFinalValue = 0;

        var finalTakeHome = 0;

        var finalSS = 0;

        var finalDD = 0;

        var finalAccumulationEndBalance = 0;

        var unattainableTHP =  true;

        for(i=400;i<=1000;i=i+5){
          for(ss=0;ss<=upperSS;ss=ss+1){

        var concessionalContribution = validEmployerContribution + ss;

        drawdownValue = i/10000;

        if(age < 60){
          assessablePensionIncome = beforeTTR * drawdownValue * (1 - (taxFreePercent/100));
        }else{
          assessablePensionIncome = 0;
        }

        taxableIncome = cses - ss + assessablePensionIncome;

        tmLevi = TaxRateCalculator.getTaxRate(taxableIncome) * (taxableIncome
           + 1 - TaxRateCalculator.getLowerBoundValue(taxableIncome))
         + TaxRateCalculator.getTaxBase(taxableIncome);

        rebate = assessablePensionIncome * 0.15;

        afterTaxIncome = taxableIncome - tmLevi + rebate;

        if(age <60){
          exemptPensionIncome =  beforeTTR * drawdownValue * (taxFreePercent/100);
        }else{
          exemptPensionIncome = beforeTTR * drawdownValue;
        }

        takeHomePayment = afterTaxIncome + exemptPensionIncome;
        // console.log("TAKE HOME PAYMENT " + takeHomePayment);

        if(takeHomePayment >= minTakeHomePay){
          var pensionPayment = assessablePensionIncome + exemptPensionIncome;

          var investmentIncome = (pensionStartBalance * nrpSqrt) + ((pensionStartBalance * (nrpSqrt+1) - pensionPayment) * nrpSqrt);

          var pensionEndBalance = pensionStartBalance - pensionPayment + investmentIncome;

          var netConcessionalContribution;

          if(concessionalContribution < concessionalContributionCap){
          netConcessionalContribution = concessionalContribution * concessionalContributionTax;
        }else{
          netConcessionalContribution = (concessionalContribution * concessionalContributionTax) + (
          (concessionalContribution - concessionalContributionCap) * (TaxRateCalculator.getTaxRate(taxableIncome) - 0.15));
        }

        netConcessionalContribution = concessionalContribution - netConcessionalContribution;

        var investmentIncome = netConcessionalContribution * (Math.sqrt(1 + netReturnInAccumulation/100) - 1);

        var accumulationEndBalance = accumulationBeginningBalance + netConcessionalContribution + investmentIncome;

        var finalValue = takeHomePayment + pensionEndBalance + accumulationEndBalance;

        if(finalValue > maxFinalValue){
          //console.log("changing final value from" + maxFinalValue +"to" + finalValue);
          maxFinalValue = finalValue;
          //console.log("changing thp value from" + finalTakeHome +"to" + takeHomePayment);
          finalTakeHome = takeHomePayment;
          //console.log("changing DD value from" + finalDD +"to" + drawdownValue);
          finalDD = drawdownValue;
          //console.log("changing SS value from" + finalSS +"to" + ss);
          finalSS = ss;
          //console.log("changing AEB value from" + finalAccumulationEndBalance +"to" + accumulationEndBalance);
          finalAccumulationEndBalance = accumulationEndBalance;
          unattainableTHP = false;
        }

        }

      }
      }
      return [finalTakeHome,finalAccumulationEndBalance,maxFinalValue,finalDD,finalSS,unattainableTHP];
      };




      this.checkContribution=function(cses,dob,ss,datePension){
        var age = AgeCalculator.getAge(dob);

        var concessionalContributionCap ;

        if(age < 49){
          concessionalContributionCap = 30000;
        }else{
          concessionalContributionCap = 35000;
        }

        var concessionalContribution = SGCRate.calculateSGCRate(datePension)*cses;

        var employerContributionMax;

        if(concessionalContribution >= concessionalContributionCap){
          employerContributionMax = 19307.80;
        }else{
          employerContributionMax = concessionalContribution;
        }
        var totalContribution = ss + employerContributionMax;
        //console.log(totalContribution);

       var maxSalarySacrifice = concessionalContributionCap - employerContributionMax;

        if(totalContribution <= concessionalContributionCap){
          return [false,maxSalarySacrifice];
        }else{
          return [true,maxSalarySacrifice];
        }
      }

}]);
