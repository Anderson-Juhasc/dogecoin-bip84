const { fromMnemonic, fromXPrv, fromXPub } = require('../src/index')

var mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
var root = new fromMnemonic(mnemonic)
var child0 = root.deriveAccount(0)

console.log('mnemonic:', mnemonic)
console.log('rootpriv:', root.getRootPrivateKey())
console.log('rootpub:', root.getRootPublicKey())
console.log('\n');

var account0 = new fromXPrv(child0)

console.log("Account 0, root = m/84'/3'/0'");
console.log('Account 0 xprv:', account0.getAccountPrvKey())
console.log('Account 0 xpub:', account0.getAccountPubKey())
console.log('\n');

console.log("Account 0, first receiving address = m/84'/3'/0'/0/0");
console.log('Prvkey:', account0.getPrvKey(0))
console.log('Pubkey:', account0.getPubKey(0))
console.log('Address:', account0.getAddress(0))
console.log('\n');

console.log("Account 0, first receiving address = m/84'/3'/0'/0/0");
console.log('Prvkey:', account0.getPrvKey(0))
console.log('Pubkey:', account0.getPubKey(0))
console.log('Address:', account0.getAddress(0, false, 49))
console.log('\n');

console.log("Account 0, first receiving address = m/84'/3'/0'/0/0");
console.log('Prvkey:', account0.getPrvKey(0, false))
console.log('Pubkey:', account0.getPubKey(0, false))
console.log('Address:', account0.getAddress(0, false, 84))
console.log('\n');

var xpub = 'tpubDDSa7UfVRiRBi9ysrvCariYbmm1NDCqEXEqDZArYQJaP75ZeqaKpnUm2tF45QXUQBcPA8NjDfTHWY3cdjwBnh2L2gwoSitnvv92ZTEgmScv'
var account1 = new fromXPub(xpub)

console.log("Account 1, root = m/84'/3'/0'");
console.log('Account 1 xpub:', account1.getAccountPubKey());
console.log('\n');

console.log("Account 1, first receiving address = m/84'/3'/0'/0/0");
console.log('Pubkey:', account1.getPubKey(0))
console.log('Address:', account1.getAddress(0))
console.log('\n');

console.log("Account 1, first receiving address = m/84'/3'/0'/0/0");
console.log('Pubkey:', account1.getPubKey(0, true))
console.log('Address:', account1.getAddress(0, false, 49))
console.log('\n');

console.log("Account 1, first receiving address = m/84'/3'/0'/0/0");
console.log('Pubkey:', account1.getPubKey(0, true))
console.log('Address:', account1.getAddress(0, false, 84))
console.log('\n');
