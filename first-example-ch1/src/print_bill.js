
/**
 * Provides properly-formatted bill provided an invoice and list of plays.
 * @param {Invoice} invoice invoice for a customer.
 * @param {[Play]} plays list of plays.
 * @return {String} properly-formatted bill.
 */
export function statement(invoice, plays) {
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (const perf of invoice.performances) {
    const play = plays[perf.playID];
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

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // print line for this order
    const amount = usd(thisAmount/100);
    result += `  ${play.name}: ${amount} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(calculateTotalAmount(invoice, plays)/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}


/**
 * Alias for Intl.NumberFormat's format function with usd defaults
 * @param {Number} value dollar value
 * @return {String} USD formatted number
 */
function usd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2}).format(value);
}

/**
   * @param {Invoice} invoice
   * @param {[Play]} plays list of plays.
   * @return {Number} total amount to charge for the provided invoice
   */
function calculateTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (const perf of invoice.performances) {
    const play = plays[perf.playID];
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
