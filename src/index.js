const { bip32 } = require('bitcoinjs-lib')
    , b58 = require('bs58check')
    , bip39 = require('bip39')
    , BIP84 = require('bip84')
    , { NETWORKS } = require('./constants')

function fromMnemonic(mnemonic, password, isTestnet) {
  BIP84.fromSeed.call(this, mnemonic, password, isTestnet, 3)
}

fromMnemonic.prototype = Object.create(BIP84.fromSeed.prototype)

function fromZPrv(zprv) {
  BIP84.fromZPrv.call(this, zprv, false, NETWORKS)
}

fromZPrv.prototype = Object.create(BIP84.fromZPrv.prototype)

function fromZPub(zpub) {
  BIP84.fromZPub.call(this, zpub, false, NETWORKS)
}

fromZPub.prototype = Object.create(BIP84.fromZPub.prototype)

module.exports = {
  generateMnemonic: bip39.generateMnemonic,
  entropyToMnemonic: bip39.entropyToMnemonic,
  fromMnemonic: fromMnemonic,
  fromZPrv: fromZPrv,
  fromZPub: fromZPub
}
