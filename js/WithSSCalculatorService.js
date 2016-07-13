//var WithSSCalculatorService = angular.module('WithSSCalculatorService', [])
app.service('WithSSCalculator', ['TaxRateCalculator','SGCRate','AgeCalculator',function (TaxRateCalculator,SGCRate,AgeCalculator){
    this.getResults = function(dob,datePension,currentSalaryExcludeSuper,beforeTTR,
      taxFreePercent,netReturnInAccumulation,netReturnInPension,minTakeHomePay,ss,drawdownPercent){
        var financialYear=datePension.getFullYear()+1;
        console.log(financialYear);
        var drawdownValue = drawdownPercent;
        console.log(drawdownValue);
        var cses =  currentSalaryExcludeSuper;
        console.log(cses);
        var assesablePensionIncome;
        var age = AgeCalculator.getAge(dob);
        console.log("Age is", age);
        console.log("dob is",dob);
        if(age < 60){
          assessablePensionIncome = beforeTTR * drawdownValue * (1 - (taxFreePercent/100));
        }else{
          assessablePensionIncome = 0;
        }
        console.log(assessablePensionIncome);
        //To Ask
        var salarySacrificeAmount = ss;

        var concessionalContribution = SGCRate.calculateSGCRate(datePension)*cses + salarySacrificeAmount;
        console.log(concessionalContribution);
        var taxableIncome = cses - salarySacrificeAmount + assessablePensionIncome;
        console.log(taxableIncome);
        var tmLevi = TaxRateCalculator.getTaxRate(taxableIncome) * (taxableIncome
           + 1 - TaxRateCalculator.getLowerBoundValue(taxableIncome))
         + TaxRateCalculator.getTaxBase(taxableIncome);
         console.log(tmLevi);
         var rebate = assessablePensionIncome * 0.15;
         console.log(rebate);
         var afterTaxIncome = taxableIncome - tmLevi + rebate;
         console.log(afterTaxIncome);
         var exemptPensionIncome;
        if(age <60){
          exemptPensionIncome =  beforeTTR * drawdownValue * (taxFreePercent/100);
        }else{
          exemptPensionIncome = beforeTTR * drawdownValue;
        }
        console.log(exemptPensionIncome);
        var takeHomePayment = afterTaxIncome + exemptPensionIncome;
        console.log(takeHomePayment);
        var pensionStartBalance = beforeTTR;
        console.log(pensionStartBalance);
        var pensionPayment = assessablePensionIncome + exemptPensionIncome;
        console.log(pensionPayment);
        var nrpSqrt = Math.sqrt(1 + (netReturnInPension/100)) - 1;
        var investmentIncome = (pensionStartBalance * nrpSqrt) + ((pensionStartBalance * (nrpSqrt+1) - pensionPayment) * nrpSqrt);
        console.log(investmentIncome);
        var pensionEndBalance = pensionStartBalance - pensionPayment + investmentIncome;
        console.log(pensionEndBalance);
        var accumulationBeginningBalance = 0;
        console.log(accumulationBeginningBalance);
        var concessionalContributionCap ;

        if(age < 49){
          concessionalContributionCap = 30000;
        }else{
          concessionalContributionCap = 35000;
        }
        // var concessionalContributionCapgt49 = 35000;

        // var concessionalContributionCaplt49 = 30000;

        var concessionalContributionTax = 0.15;

        var excessContributionTx = 0.32;

        var netConcessionalContribution;

        if(concessionalContribution < concessionalContributionCap){
        netConcessionalContribution = concessionalContribution * concessionalContributionTax;
      }else{
        netConcessionalContribution = (concessionalContribution * concessionalContributionTax) + (
        (concessionalContribution - concessionalContributionCap) * (TaxRateCalculator.getTaxRate(taxableIncome) - 0.15));
      }

      netConcessionalContribution = concessionalContribution - netConcessionalContribution;

      console.log(netConcessionalContribution);

      var investmentIncome = netConcessionalContribution * (Math.sqrt(1 + netReturnInAccumulation/100) - 1);
      console.log(investmentIncome);

      var accumulationEndBalance = accumulationBeginningBalance + netConcessionalContribution + investmentIncome;
      console.log(accumulationEndBalance);

      var finalValue = takeHomePayment + pensionEndBalance + accumulationEndBalance;
      console.log(finalValue);

      return [takeHomePayment,accumulationEndBalance,finalValue]
      };

      this.checkContribution=function(cses,dob,ss,datePension){
        var age = AgeCalculator.getAge(dob);
        var concessionalContribution = SGCRate.calculateSGCRate(datePension)*cses;
        var totalContribution = ss + concessionalContribution;
        console.log(totalContribution);

        var concessionalContributionCap ;

        if(age < 49){
          concessionalContributionCap = 30000;
        }else{
          concessionalContributionCap = 35000;
        }

        var maxSalarySacrifice = concessionalContributionCap - concessionalContribution;

        if(totalContribution <= concessionalContributionCap){
          return [false,maxSalarySacrifice];
        }else{
          return [true,maxSalarySacrifice];
        }
      }

}]);
