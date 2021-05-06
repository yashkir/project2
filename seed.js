const User = require('./models/user');
const Ledger = require('./models/ledger');
const Transaction = require('./models/transaction');

require('dotenv').config();
require('./config/database');

(async function() {
  try {
    console.log("Clearing DB...");
    await User.deleteMany({});
    await Ledger.deleteMany({});
    await Transaction.deleteMany({});

    console.log("Seeding DB...");
    let testUser = new User({ username: 'test' });
    let regProm = new Promise((resolve, reject) => {
      User.register(testUser, 'test', err => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve();
        }
      });
    });
    await regProm;

    let testLedger = new Ledger({
      name: 'Test Ledger',
      description: 'This is purely for testing.',
      owner: testUser._id,
      transactions: []
    });

    let newTransaction = new Transaction({
      name: 'No Frills',
      description: 'Bought some stuff at the grocery!',
      date: new Date('2020-04-20'),
      entries: [
        {account: 'Expenses::Groceries', amount: 50.00, commodity: '$'},
        {account: 'Assets::Chequing', amount: -50.00, commodity: '$'}
      ]
    });
    testLedger.transactions.push(newTransaction);
    await newTransaction.save();
    await testLedger.save();

    newTransaction = new Transaction({
      name: 'No Frills',
      description: 'Bought some parts',
      date: new Date('2020-04-21'),
      entries: [
        {account: 'Expenses::Electronics', amount: 500.00, commodity: '$'},
        {account: 'Assets::Chequing', amount: -500.00, commodity: '$'}
      ]
    });

    testLedger.transactions.push(newTransaction);

    await newTransaction.save();
    await testLedger.save();

    testUser.ledgers.push(testLedger);
    await testLedger.save();
    await testUser.save();

    console.log("Done seeding DB...");
  } catch(err) {
    console.log(err);
  } finally {
    process.exit();
  }
})()
