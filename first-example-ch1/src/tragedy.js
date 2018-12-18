import {Play} from './play';

/**
 * Tragedy
 */
export class Tragedy extends Play {
  /**
  * @param {Number} audience
  * @return {Number} cost of Tragedy Play in cents
  */
  costCents(audience) {
    let amount = 40000;
    if (audience > 30) {
      amount += 1000 * (audience - 30);
    }
    return amount;
  }
}
