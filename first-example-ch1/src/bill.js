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
   * @return {String} properly-formatted bill.
   */
  statement(invoice) {
    const statementData = this.getStatementData(invoice);
    let result = `Statement for ${statementData.customer}\n`;
    for (const play of statementData.plays) {
      result += `  ${play.name}: ${play.amount} (${play.audience} seats)\n`;
    }
    result += `Amount owed is ${statementData.amountOwed}\n`;
    result += `You earned ${statementData.volumeCredits} credits\n`;
    return result;
  }

  /**
   * get data required to create a statement for a given invoice
   * @param {Invoice} invoice
   * @return {StatementData} data required to create a statement
   */
  getStatementData(invoice) {
    return {
      customer: invoice.customer,
      amountOwed: this.usd(this.calculateTotalAmount(invoice)/100),
      volumeCredits: this.calculateVolumeCredits(invoice),
      plays: this.getInfoForPlays(invoice.performances),
    };
  }

  /**
   * get data for a list of performances
   * @param {[Performance]} performances
   * @return {[PerformanceData]} PerformanceData for each performance
   */
  getInfoForPlays(performances) {
    const plays = []; // (name, amount, audience)
    for (const perf of performances) {
      plays.push(this._getInfoForPlay(perf));
    }
    return plays;
  }

  /**
   * get data for a specific performance
   * @param {Performance} performance
   * @return {PerformanceData} (name, amount, audience) for the performance
   */
  _getInfoForPlay(performance) {
    const play = this.plays[performance.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (performance.audience > 30) {
          thisAmount += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30000;
        if (performance.audience > 20) {
          thisAmount += 10000 + 500 * (performance.audience - 20);
        }
        thisAmount += 300 * performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return {
      name: play.name,
      amount: this.usd(thisAmount/100),
      audience: performance.audience,
    };
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
