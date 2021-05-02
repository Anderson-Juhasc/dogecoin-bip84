const { fromMnemonic, fromZPrv, fromZPub } = require('../src/index')

var mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
var root = new fromMnemonic(mnemonic, '')
var child0 = root.deriveAccount(0)

console.log('mnemonic:', mnemonic)
console.log('rootpriv:', root.getRootPrivateKey())
console.log('rootpub:', root.getRootPublicKey())
console.log('child 0:', child0)
console.log('\n');

var account0 = new fromZPrv(child0)

console.log("Account 0, root = m/84'/3'/0'");
console.log('Account 0 zprv:', account0.getAccountPrivateKey())
console.log('Account 0 zpub:', account0.getAccountPublicKey())
console.log('\n');

console.log("Account 0, first receiving address = m/84'/3'/0'/0/0");
console.log('Prvkey:', account0.getPrivateKey(0))
console.log('Pubkey:', account0.getPublicKey(0))
console.log('Address:', account0.getAddress(0))
console.log('\n');

console.log("Account 0, first receiving address = m/44'/3'/0'/0/0");
console.log('Prvkey:', account0.getPrivateKey(0))
console.log('Pubkey:', account0.getPublicKey(0))
console.log('Address:', account0.getAddress(0, false, 44))
console.log('\n');

console.log("Account 0, first receiving address = m/49'/3'/0'/0/0");
console.log('Prvkey:', account0.getPrivateKey(0, false))
console.log('Pubkey:', account0.getPublicKey(0, false))
console.log('Address:', account0.getAddress(0, false, 49))
console.log('\n');

var zpub = 'vpub5Vm8JiyeMgCWT2SqgFkoJyaovNQH8RCF3wAUKCrFAfRdVujdYubBrYUGtggtabj71XxvUQuS5r9AgT4VhGvax9gXEpdi9XBg7jHnvm1WDii'
var account1 = new fromZPub(zpub)

console.log("Account 1, root = m/84'/3'/0'");
console.log('Account 1 zpub:', account1.getAccountPublicKey());
console.log('\n');

console.log("Account 1, first receiving address = m/84'/3'/0'/0/0");
console.log('Pubkey:', account1.getPublicKey(0))
console.log('Address:', account1.getAddress(0))
console.log('\n');

console.log("Account 1, first receiving address = m/44'/3'/0'/0/0");
console.log('Pubkey:', account1.getPublicKey(0, false))
console.log('Address:', account1.getAddress(0, false, 44))
console.log('\n');

console.log("Account 1, first receiving address = m/49'/3'/0'/0/0");
console.log('Pubkey:', account1.getPublicKey(0, false))
console.log('Address:', account1.getAddress(0, false, 49))
console.log('\n');
