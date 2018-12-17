const { PlayManager } = require('../src/play/play_manager');
const { Bill } = require('../src/bill');
const { Performance } = require('../src/performance');
const { Invoice } = require('../src/invoice');
const fs = require('fs');

test('prints properly-formatted bill', () => {
  const playJson = JSON.parse(fs.readFileSync('./tst/resources/plays.json'));
  const playManager = new PlayManager(playJson);
  const bill = new Bill(playManager);
  
  const invoicesJson = JSON.parse(fs.readFileSync('./tst/resources/invoices.json'));
  const invoices = invoicesJson.map(invoiceJson => {
    const performances = invoiceJson.performances.map(performanceJson => {
      const play = playManager.getPlay(performanceJson.playID);
      return new Performance(play, performanceJson.audience)
    });
    return new Invoice(invoiceJson.customer, performances, playManager);
  });

  expect(bill.statement(invoices[0])).toEqual(`Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`);
});



