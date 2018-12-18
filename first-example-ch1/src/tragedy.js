import {Play} from './play';

/**
 * Tragedy
 */
export class Tragedy extends Play {
  /**
  * @param {Performance} performance
  * @return {Number} cost of Tragedy Play in cents
  */
  costCents(performance) {
    let amount = 40000;
    if (performance.audience > 30) {
      amount += 1000 * (performance.audience - 30);
    }
    return amount;
  }
}
