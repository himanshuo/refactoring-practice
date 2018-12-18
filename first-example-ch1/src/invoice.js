import {Comedy} from './play/comedy';

/**
 * Customer Invoice
 */
export class Invoice {
  /**
    *
    * @param {String} customer
    * @param {[Performance]} performances
    * @param {PlayManager} playManager
    */
  constructor(customer, performances, playManager) {
    this.customer = customer;
    this.performances = performances;
    this.playManager = playManager;
  }

  /**
     * @return {String} customer
     */
  getCustomer() {
    return this.customer;
  }

  /**
    * @return {Number} total amount to charge for the provided invoice
    */
  getCostCents() {
    let totalAmount = 0;
    for (const performance of this.performances) {
      totalAmount += performance.costCents();
    }
    return totalAmount;
  }


  /**
    * @return {Number} number of credits given based on the audience sizes
    */
  getVolumeCredits() {
    let volumeCredits = 0;
    for (const performance of this.performances) {
      const play = performance.getPlay();
      volumeCredits += Math.max(performance.getAudience() - 30, 0);
      if (play instanceof Comedy) {
        volumeCredits += Math.floor(performance.getAudience() / 5);
      }
    }
    return volumeCredits;
  }

  /**
   * @return {[Performance]}
   */
  getPerformances() {
    return this.performances;
  }
}
