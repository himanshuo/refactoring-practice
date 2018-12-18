import {Play} from './play';

/**
 * Comedy Play
 */
export class Comedy extends Play {
  /**
  * @param {Number} audience
  * @return {Number} cost of Comedy Play in cents
  */
  costCents(audience) {
    let amount = 30000;
    if (audience > 20) {
      amount += 10000 + 500 * (audience - 20);
    }
    amount += 300 * audience;
    return amount;
  }

  /**
   * @param {Number} audience
   * @return {Number} volume credits recieved due to size of audience
   */
  volumeCredits(audience) {
    return Math.max(audience - 30, 0) + Math.floor(audience / 5);
  }
}
