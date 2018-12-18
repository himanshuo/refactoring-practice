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
   * Provides properly text-formatted bill provided
   * an invoice and list of plays.
   * @param {Invoice} invoice invoice for a customer.
   * @return {String} properly-formatted bill.
   */
  textStatement(invoice) {
    return this.applyTextStatementFormat(invoice);
  }

  /**
   * Provides properly html-formatted bill provided
   * an invoice and list of plays.
   * @param {Invoice} invoice invoice for a customer.
   * @return {String} properly-formatted bill.
   */
  htmlStatement(invoice) {
    return this.applyHtmlStatementFormat(invoice);
  }

  /**
   *
   * @param {Invoice} invoice
   * @return {String} statement format
   */
  applyTextStatementFormat(invoice) {
    let result = `Statement for ${invoice.getCustomer()}\n`;
    for (const performance of invoice.getPerformances()) {
      const play = performance.getPlay();
      const name = play.getName();
      const cost = performance.costCents();
      const audience = performance.getAudience();
      result += `  ${name}: ${this.usd(cost)} (${audience} seats)\n`;
    }
    result += `Amount owed is ${this.usd(invoice.getCostCents())}\n`;
    result += `You earned ${invoice.getVolumeCredits()} credits\n`;
    return result;
  }

  /**
   *
   * @param {Invoice} invoice
   * @return {String} statement format
   */
  applyHtmlStatementFormat(invoice) {
    let result = `<h1>Statement for ${invoice.getCustomer()}</h1>`;
    for (const performance of invoice.getPerformances()) {
      result += '<div>';
      const play = performance.getPlay();
      const name = play.getName();
      const cost = performance.costCents();
      const audience = performance.getAudience();
      result += `${name}: ${this.usd(cost)} (${audience} seats)\n`;
      result += '</div>';
    }
    result += `<br/>Amount owed is ${this.usd(invoice.getCostCents())}\n`;
    result += `<br/>You earned ${invoice.getVolumeCredits()} credits\n`;
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
      minimumFractionDigits: 2}).format(value/100);
  }
}
