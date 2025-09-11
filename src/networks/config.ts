const NETWORKS = {
    celo: {
      rpcUrl: 'https://forno.celo.org',
      contractAddress: '0xEbc79539af49e1Ee8fE7Ee8721bcA293441ED058',
      name: 'Celo Mainnet',
      chainId: 42220,
      currency: 'CELO',
    },
    lisk: {
      rpcUrl: 'https://rpc.api.lisk.com',
      contractAddress: '0xf9Dd4b5003aeaB126cdBc89c0D04fC10e9160fBd', // Correct Lisk contract from LiskMissile.js
      name: 'Lisk Mainnet',
      chainId: 1135,
      currency: 'ETH',
    },
    base: {
      rpcUrl: 'https://mainnet.base.org',
      contractAddress: '0x6a613CABCFDc03541614272DfE9519e8d183752b', // Correct Base contract from base-missile.js
      name: 'Base Mainnet',
      chainId: 8453,
      currency: 'ETH',
    },
    optimism: {
      rpcUrls: 'https://mainnet.optimism.io',
      contractAddress: '0xAE4a3cCb094B1E475CA8b83BCBA5508a30EBF1C0',
      name: 'Optimism Mainnet',
      chainId: 10,
      currency: 'ETH',
    }
  };