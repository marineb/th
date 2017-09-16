import partsCounts from './parts-counts';
import thresholds from './thresholds';

export default class Calculator {
    isExempted(status, dependentsCount, monthlyIncome) {
        let thresholds = this._getThresholds(status, dependentsCount),
            approximateMonthlyThreshold = Math.floor(thresholds.high / 10.806);

        return monthlyIncome <= approximateMonthlyThreshold;
    }

    computeNextYears(status, dependentsCount, monthlyIncome, previousTax) {
        let thresholds = this._getThresholds(status, dependentsCount),
            lowMonthlyThreshold = Math.floor(thresholds.low / 10.806);

        if (monthlyIncome <= lowMonthlyThreshold) {
            return {
                2018: previousTax * 0.7,
                2019: previousTax * 0.35,
                2020: 0,
            };
        }

        let highMonthlyThreshold = Math.floor(thresholds.high / 10.806);

        if (monthlyIncome <= highMonthlyThreshold) {
            let yearlyIncome = monthlyIncome * 12;

            return {
                2018: previousTax * (1 - (0.3 * (thresholds.high - yearlyIncome) / (thresholds.high - thresholds.low))),
                2019: previousTax * (1 - (0.65 * (thresholds.high - yearlyIncome) / (thresholds.high - thresholds.low))),
                2020: previousTax * (1 - ((thresholds.high - yearlyIncome) / (thresholds.high - thresholds.low))),
            };
        }

        return {
            2018: previousTax,
            2019: previousTax,
            2020: previousTax,
        };
    }

    _getThresholds(status, dependentsCount) {
        if (typeof Calculator.PARTS_COUNTS[status] === 'undefined') {
            throw new Error('Invalid status: '+ status);
        }

        if (typeof Calculator.PARTS_COUNTS[status][dependentsCount] === 'undefined') {
            throw new Error('Invalid dependents count: '+ dependentsCount);
        }

        return Calculator.THRESHOLDS[Calculator.PARTS_COUNTS[status][dependentsCount]];
    }
};

Calculator.STATUS_SINGLE = 1;
Calculator.STATUS_CONCUBINAGE = 2;
Calculator.STATUS_MARRIED = 3;
Calculator.STATUS_WINDOW = 4;

Calculator.PARTS_COUNTS = partsCounts;

Calculator.THRESHOLDS = thresholds;
