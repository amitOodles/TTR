
//var WithoutSSCalculatorService = angular.module('WithoutSSCalculatorService', [])
app.service('WithoutSSCalculator', ['TaxRateCalculator','SGCRate',function (TaxRateCalculator,SGCRate){
        this.getFinalAmount = function (datePension,currentSalaryExcludeSuper,beforeTTR,taxFreePercent,netReturnInAccumulation,netReturnInPension,minTakeHomePay) {
            taxFreePercent/=100;
            netReturnInAccumulation/=100;
            netReturnInPension/=100;
            var concessionalContributionTax=0.15;
            var excessContributionTax=0.32;
            var concessionalContributionCap=[30000,35000];
            var financialYear=datePension.getFullYear()+1;
            var drawdownValue=0.04;
            var salaryExcludeSGC=currentSalaryExcludeSuper;
            var assessablePensionIncome=0;
            var concessionalContribution= salaryExcludeSGC*SGCRate.calculateSGCRate(datePension);
            var taxableIncome= salaryExcludeSGC+assessablePensionIncome;
            var taxMediLevy=TaxRateCalculator.getTaxRate(taxableIncome)*(taxableIncome+1-TaxRateCalculator.getLowerBoundValue(taxableIncome))+ TaxRateCalculator.getTaxBase(taxableIncome);
            var rebate=0;
            var afterTaxReturn=taxableIncome-taxMediLevy;
            var exemptPensionIncome=0;
            var takeHomePay=afterTaxReturn+exemptPensionIncome;
            var pensionStartBalance=0;
            var pensionPayment=0;
            var pensionEndBalance=0;
            var accumulateBeinningBalance=beforeTTR;
            var netConcessionalContribution;
            if(concessionalContribution<concessionalContributionCap[1]){
                        netConcessionalContribution=concessionalContribution-(concessionalContribution*concessionalContributionTax);
                    }else{
                        netConcessionalContribution=concessionalContribution-(concessionalContributionCap[1]*concessionalContributionTax+excessContributionTax*(concessionalContribution-concessionalContributionCap[1]));
                    }
            var investmentIncome=accumulateBeinningBalance*netReturnInAccumulation+netConcessionalContribution*(netReturnInAccumulation/2);
            var accumulationEndBalance=accumulateBeinningBalance+netConcessionalContribution+investmentIncome;
            var finalAmount=accumulationEndBalance+takeHomePay+pensionEndBalance;
            console.log("salaryExcludeSGC:",salaryExcludeSGC);
            console.log("concessionalContribution:",concessionalContribution);
            console.log("taxableIncome:",taxableIncome);
            console.log("taxMediLevy:",taxMediLevy);
            console.log("afterTaxReturn:",afterTaxReturn);
            console.log("takeHomePay:",takeHomePay);
            console.log("accumulateBeinningBalance:",accumulateBeinningBalance);
            console.log("netConcessionalContribution:",netConcessionalContribution);
            console.log("investmentIncome:",investmentIncome);
            console.log("accumulationEndBalance:",accumulationEndBalance);
            console.log("finalAmount:",finalAmount);
            return [takeHomePay,accumulationEndBalance,finalAmount];
            };


}]);
