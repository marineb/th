import { expect } from 'chai';

import Calculator from '../../src/services/calculator';

describe('Calculator', () => {
    let calculator = new Calculator();

    it('should be exempted', () => {
        calculator.isExempted(Calculator.STATUS_SINGLE, 4, 2000);

        expect('a').to.contain('a');
    });

    it('should be exempted', () => {
        console.log(calculator.computeNextYears(Calculator.STATUS_SINGLE, 0, 2500, 600));
        console.log(calculator.computeNextYears(Calculator.STATUS_SINGLE, 0, 2600, 600));

        expect('a').to.contain('a');
    });
});
