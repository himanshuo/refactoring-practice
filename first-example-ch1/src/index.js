import {statement} from './print_bill';

const fs = require('fs');
const invoices = JSON.parse(fs.readFileSync('./src/invoices.json'));
const plays = JSON.parse(fs.readFileSync('./src/plays.json'));

for (const invoice of invoices) {
  console.log(statement(invoice, plays));
}
