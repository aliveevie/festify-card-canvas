import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { NETWORKS } from '@/lib/web3-config'
import { useToast } from '@/hooks/use-toast'

export const useWallet = () => {
  const { address, isConnected, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()
  const { toast } = useToast()

  const { data: balance } = useBalance({
    address,
  })

  const currentNetwork = Object.entries(NETWORKS).find(([, network]) => network.id === chainId)?.[1]

  const connect = async () => {
    try {
      await open()
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnect()
      toast({
        title: "Disconnected",
        description: "Wallet disconnected successfully.",
      })
    } catch (error) {
      toast({
        title: "Disconnect Error",
        description: "Failed to disconnect wallet.",
        variant: "destructive",
      })
    }
  }

  const formatAddress = (addr?: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (balance?: { formatted: string; symbol: string }) => {
    if (!balance) return '0'
    return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
  }

  return {
    address,
    isConnected,
    chainId,
    balance,
    currentNetwork,
    connect,
    disconnect: disconnectWallet,
    formatAddress,
    formatBalance,
  }
}