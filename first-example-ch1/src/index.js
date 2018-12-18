import {Bill} from './bill';

const fs = require('fs');
const invoices = JSON.parse(fs.readFileSync('./src/invoices.json'));
const plays = JSON.parse(fs.readFileSync('./src/plays.json'));
const bill = new Bill(new PlayManager(plays));

for (const invoice of invoices) {
  console.log(bill.statement(invoice));
}
