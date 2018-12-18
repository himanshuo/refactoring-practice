/**
 * Bill
 */
export class Bill {
  /**
   * Create a Bill
   * @param {[Play]} plays
   */
  constructor(plays) {
    this.plays = plays;
  }

  /**
   * Provides properly-formatted bill provided an invoice and list of plays.
   * @param {Invoice} invoice invoice for a customer.
   * @param {[Play]} plays list of plays.
   * @return {String} properly-formatted bill.
   */
  statement(invoice) {
    let result = `Statement for ${invoice.customer}\n`;
    for (const perf of invoice.performances) {
      const play = this.plays[perf.playID];
      let thisAmount = 0;

      switch (play.type) {
        case 'tragedy':
          thisAmount = 40000;
          if (perf.audience > 30) {
            thisAmount += 1000 * (perf.audience - 30);
          }
          break;
        case 'comedy':
          thisAmount = 30000;
          if (perf.audience > 20) {
            thisAmount += 10000 + 500 * (perf.audience - 20);
          }
          thisAmount += 300 * perf.audience;
          break;
        default:
          throw new Error(`unknown type: ${play.type}`);
      }
      // print line for this order
      const amount = this.usd(thisAmount/100);
      result += `  ${play.name}: ${amount} (${perf.audience} seats)\n`;
    }
    const amountOwed = this.usd(this.calculateTotalAmount(invoice)/100);
    result += `Amount owed is ${amountOwed}\n`;
    result += `You earned ${this.calculateVolumeCredits(invoice)} credits\n`;
    return result;
  }

  /**
   * Alias for Intl.NumberFormat's format function with usd defaults
   * @param {Number} value dollar value
   * @return {String} USD formatted number
   */
  usd(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2}).format(value);
  }

  /**
   * @param {Invoice} invoice
   * @return {Number} total amount to charge for the provided invoice
   */
  calculateTotalAmount(invoice) {
    let totalAmount = 0;
    for (const perf of invoice.performances) {
      const play = this.plays[perf.playID];
      let thisAmount = 0;
      switch (play.type) {
        case 'tragedy':
          thisAmount = 40000;
          if (perf.audience > 30) {
            thisAmount += 1000 * (perf.audience - 30);
          }
          break;
        case 'comedy':
          thisAmount = 30000;
          if (perf.audience > 20) {
            thisAmount += 10000 + 500 * (perf.audience - 20);
          }
          thisAmount += 300 * perf.audience;
          break;
        default:
          throw new Error(`unknown type: ${play.type}`);
      }
      totalAmount += thisAmount;
    }
    return totalAmount;
  }

  /**
   * @param {Invoice} invoice
   * @return {Number} number of credits given based on the audience sizes
   */
  calculateVolumeCredits(invoice) {
    let volumeCredits = 0;
    for (const perf of invoice.performances) {
      const play = this.plays[perf.playID];
      volumeCredits += Math.max(perf.audience - 30, 0);
      if ('comedy' === play.type) {
        volumeCredits += Math.floor(perf.audience / 5);
      }
    }
    return volumeCredits;
  }
}
