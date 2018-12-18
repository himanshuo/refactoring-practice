import {Play} from './play';

/**
 * Comedy Play
 */
export class Comedy extends Play {
  /**
  * @param {Performance} performance
  * @return {Number} cost of Comedy Play
  */
  cost(performance) {
    let amount = 30000;
    if (performance.audience > 20) {
      amount += 10000 + 500 * (performance.audience - 20);
    }
    amount += 300 * performance.audience;
    return amount;
  }
}
