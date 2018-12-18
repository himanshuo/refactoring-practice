import {Comedy} from './comedy';

/**
 * Bill
 */
export class Bill {
  /**
   * Create a Bill
   * @param {[PlayManager]} playManager
   */
  constructor(playManager) {
    this.playManager = playManager;
  }

  /**
   * Provides properly-formatted bill provided an invoice and list of plays.
   * @param {Invoice} invoice invoice for a customer.
   * @return {String} properly-formatted bill.
   */
  statement(invoice) {
    return this.applyStatementFormat(this.getStatementData(invoice));
  }

  /**
   *
   * @param {StatementData} statementData
   * @return {String} statement format
   */
  applyStatementFormat(statementData) {
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
      amountOwed: this.usd(this.calculateTotalAmount(invoice)),
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
    const play = this.playManager.getPlay(performance.playID);
    return {
      name: play.name,
      amount: this.usd(play.costCents(performance)),
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
      minimumFractionDigits: 2}).format(value/100);
  }

  /**
   * @param {Invoice} invoice
   * @return {Number} total amount to charge for the provided invoice
   */
  calculateTotalAmount(invoice) {
    let totalAmount = 0;
    for (const perf of invoice.performances) {
      const play = this.playManager.getPlay(perf.playID);
      totalAmount += play.costCents(perf);
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
      const play = this.playManager.getPlay(perf.playID);
      volumeCredits += Math.max(perf.audience - 30, 0);
      if (play instanceof Comedy) {
        volumeCredits += Math.floor(perf.audience / 5);
      }
    }
    return volumeCredits;
  }
}
