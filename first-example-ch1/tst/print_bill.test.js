const { Bill } = require('../src/bill');
const {PlayManager} = require('../src/play_manager');
const { Invoice } = require('../src/invoice');
const { Performance } = require('../src/performance');

test('prints properly-formatted bill', () => {
    const invoiceJson = {
        "customer": "BigCo",
        "performances": [
          {
            "playID": "hamlet",
            "audience": 55
          },
          {
            "playID": "as-like",
            "audience": 35
          },
          {
            "playID": "othello",
            "audience": 40
          }
        ]
      };
      const plays = {
        "hamlet": {
          "name": "Hamlet",
          "type": "tragedy"
        },
        "as-like": {
          "name": "As You Like It",
          "type": "comedy"
        },
        "othello": {
          "name": "Othello",
          "type": "tragedy"
        }
    };
  const playManager = new PlayManager(plays);
  const performances = invoiceJson.performances.map(json => {
    const play = playManager.getPlay(json.playID);
    return new Performance(play, json.audience)
  });
  const invoice = new Invoice(invoiceJson.customer, performances, playManager);
  expect(new Bill(playManager).statement(invoice)).toEqual(`Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`)
});



