import {PlayManager} from './play/play_manager';
import {Bill} from './bill';
import {Performance} from './performance';
import {Invoice} from './invoice';

const fs = require('fs');

const playJson = JSON.parse(fs.readFileSync('./src/resources/plays.json'));
const playManager = new PlayManager(playJson);
const bill = new Bill(playManager);

const invoicesJson = JSON.parse(
    fs.readFileSync('./src/resources/invoices.json'));
const invoices = invoicesJson.map((invoiceJson) => {
  const performances = invoiceJson.performances.map((performanceJson) => {
    const play = playManager.getPlay(performanceJson.playID);
    return new Performance(play, performanceJson.audience);
  });
  return new Invoice(invoiceJson.customer, performances, playManager);
});

for (const invoice of invoices) {
  console.log(bill.textStatement(invoice));
  console.log(bill.htmlStatement(invoice));
}
