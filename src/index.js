const { bip32, payments } = require('bitcoinjs-lib')
    , b58 = require('bs58check')
		,	bip39 = require('bip39')
		, { NETWORKS } = require('./constants')

function fromMnemonic(mnemonic, password, isTestnet) {
  this.seed = bip39.mnemonicToSeedSync(mnemonic, password ? password : '')
  this.network = isTestnet ? NETWORKS.testnet : NETWORKS.mainnet
}

fromMnemonic.prototype.getRootPrivateKey = function() {
  const rootPrvKey = bip32.fromSeed(this.seed, this.network).toBase58()

  return rootPrvKey
}

fromMnemonic.prototype.getRootPublicKey = function() {
  const rootPubKey = bip32.fromSeed(this.seed, this.network).neutered().toBase58()

  return rootPubKey
}

fromMnemonic.prototype.deriveAccount = function(index, changePurpose) {
  const purpose = changePurpose || 84
      , keypath = `m/${purpose}'/${3}'/${index}'`
      , account = bip32.fromSeed(this.seed, this.network).derivePath(keypath).toBase58()

  return account
}

function fromXPrv(xprv, isTestnet) {
  this.network = isTestnet ? NETWORKS.testnet : NETWORKS.mainnet
	this.xprv = this.toHD(xprv)
}

fromXPrv.prototype.toHD = function (xprv) {
  let payload = b58.decode(xprv)
    , version = payload.slice(0, 4)
    , key = payload.slice(4)
    , buf = Buffer.allocUnsafe(4)
    , buffer

  if (Object.values(NETWORKS.mainnet.pubTypes).includes(version.toString('hex'))) {
    this.network = NETWORKS.mainnet
  }

  if (Object.values(NETWORKS.testnet.pubTypes).includes(version.toString('hex'))) {
    this.network = NETWORKS.testnet
  }

  buf.writeInt32BE(this.network.bip32.private, 0)
  buffer = Buffer.concat([buf, key])

  return b58.encode(buffer)
}

fromXPrv.prototype.getAccountPrvKey = function() {
	return this.xprv.toString()
}

fromXPrv.prototype.getAccountPubKey = function() {
  let pub = bip32.fromBase58(this.xprv, this.network).neutered().toBase58()

  return pub
}

fromXPrv.prototype.getPrvKey = function(index, isChange) {
  let change = isChange === true ? 1 : 0
    , prvKey = bip32.fromBase58(this.xprv.toString(), this.network).derive(change).derive(index)

  return prvKey.toWIF()
}

fromXPrv.prototype.getPubKey = function(index, isChange) {
  let change = isChange === true ? 1 : 0
    , pubKey = bip32.fromBase58(this.xprv.toString(), this.network).derive(change).derive(index).publicKey

  return pubKey.toString('hex')
}

fromXPrv.prototype.getAddress = function(index, isChange, purpose) {
  let change = isChange === true ? 1 : 0
    , pubKey = bip32.fromBase58(this.xprv.toString(), this.network).derive(change).derive(index).publicKey

  purpose = purpose || 44

  if (purpose === 44) {
    payment = payments.p2pkh({ pubkey: pubKey, network: this.network })
  }

  if (purpose === 49) {
    payment = payments.p2sh({
      redeem: payments.p2wpkh({ pubkey: pubKey, network: this.network }),
      network: this.network
    })
  }

  if (purpose === 84) {
    payment = payments.p2wpkh({ pubkey: pubKey, network: this.network })
  }

  return payment.address
}

function fromXPub(xpub) {
	this.xpub = this.toHD(xpub)
}

fromXPub.prototype.toHD = function (xpub) {
  let payload = b58.decode(xpub)
    , version = payload.slice(0, 4)
    , key = payload.slice(4)
    , buf = Buffer.allocUnsafe(4)
    , buffer

  if (Object.values(NETWORKS.mainnet.pubTypes).includes(version.toString('hex'))) {
    this.network = NETWORKS.mainnet
  }

  if (Object.values(NETWORKS.testnet.pubTypes).includes(version.toString('hex'))) {
    this.network = NETWORKS.testnet
  }

  buf.writeInt32BE(this.network.bip32.public, 0)
  buffer = Buffer.concat([buf, key])

  return b58.encode(buffer)
}

fromXPub.prototype.getAccountPubKey = function() {
  return this.xpub
}

fromXPub.prototype.getPubKey = function(index, isChange) {
  let change = isChange === true ? 1 : 0
    , pubKey = bip32.fromBase58(this.xpub, this.network).derive(change).derive(index).publicKey

  return pubKey.toString('hex')
}


fromXPub.prototype.getAddress = function(index, isChange, purpose) {
  let change = isChange === true ? 1 : 0
    , pubKey = bip32.fromBase58(this.xpub, this.network).derive(change).derive(index).publicKey

  purpose = purpose || 44

  if (purpose === 44) {
    payment = payments.p2pkh({ pubkey: pubKey, network: this.network })
  }

  if (purpose === 49) {
    payment = payments.p2sh({
      redeem: payments.p2wpkh({ pubkey: pubKey, network: this.network }),
      network: this.network
    })
  }

  if (purpose === 84) {
    payment = payments.p2wpkh({ pubkey: pubKey, network: this.network })
  }

  return payment.address
}

const test = new fromMnemonic('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about', '')
console.log(test.getRootPrivateKey())
console.log(test.getRootPublicKey())
const xprv = new fromXPrv(test.deriveAccount(0))
console.log(xprv.getAccountPrvKey())
console.log(xprv.getAccountPubKey())
console.log(xprv.getPrvKey(0))
console.log(xprv.getPubKey(0))
console.log(xprv.getAddress(0))
const xpub = new fromXPub(xprv.getAccountPubKey())
console.log(xpub.getAccountPubKey())
console.log(xpub.getPubKey(0))
console.log(xpub.getAddress(0))

module.exports = {
  generateMnemonic: bip39.generateMnemonic,
  entropyToMnemonic: bip39.entropyToMnemonic,
  fromSeed: fromMnemonic,
  fromZPrv: fromXPrv,
  fromZPub: fromXPub
}
