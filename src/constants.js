module.exports = {
  NETWORKS: {
    mainnet: {
      messagePrefix: '\x19Dogecoin Signed Message:\n',
      bech32: 'dc',
      bip44: 3,
      bip32: {
        public: 0x02facafd,
        private: 0x02fac398
      },
      pubTypes: {
        public: '02facafd',
        private: '02fac398'
      },
      pubKeyHash: 0x1e,
      scriptHash: 0x16,
      wif: 0x9e
    },
    testnet: {
      messagePrefix: '\x19Dogecoin Signed Message:\n',
      bech32: 'td',
      bip44: 3,
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubTypes: {
        public: '043587cf',
        private: '04358394'
      },
      pubKeyHash: 0x71,
      scriptHash: 0xc4,
      wif: 0xf1
    }
  }
}
