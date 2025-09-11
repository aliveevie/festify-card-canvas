import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { celo, base, optimism } from 'wagmi/chains'
import type { Chain } from 'wagmi/chains'

// Get projectId from WalletConnect Cloud
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'demo-project-id'

const metadata = {
  name: 'Festify',
  description: 'Cross-Chain Greeting Card NFTs',
  url: 'https://festify.com', // your app URL
  icons: ['/lovable-uploads/c098babc-78fa-4925-88df-3c53fa0f1f10.png']
}

// Define custom Lisk chain
const liskChain: Chain = {
  id: 1135,
  name: 'Lisk',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.api.lisk.com'] },
    public: { http: ['https://rpc.api.lisk.com'] },
  },
  blockExplorers: {
    default: { name: 'Lisk Explorer', url: 'https://blockscout.lisk.com' },
  },
}

// Create wagmi config
export const config = defaultWagmiConfig({
  chains: [celo, base, optimism, liskChain],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})

// Network configurations matching your contract data
export const NETWORKS = {
  celo: {
    id: celo.id,
    name: 'Celo',
    contractAddress: '0xEbc79539af49e1Ee8fE7Ee8721bcA293441ED058',
    currency: 'CELO',
    color: 'network-celo',
    chain: celo
  },
  base: {
    id: base.id,
    name: 'Base',
    contractAddress: '0x6a613CABCFDc03541614272DfE9519e8d183752b',
    currency: 'ETH',
    color: 'network-base',
    chain: base
  },
  optimism: {
    id: optimism.id,
    name: 'Optimism',
    contractAddress: '0xAE4a3cCb094B1E475CA8b83BCBA5508a30EBF1C0',
    currency: 'ETH',
    color: 'network-optimism',
    chain: optimism
  },
  lisk: {
    id: liskChain.id,
    name: 'Lisk',
    contractAddress: '0xf9Dd4b5003aeaB126cdBc89c0D04fC10e9160fBd',
    currency: 'ETH',
    color: 'network-lisk',
    chain: liskChain
  }
} as const

export type NetworkKey = keyof typeof NETWORKS