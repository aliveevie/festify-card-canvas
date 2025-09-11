import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { 
  Wallet, 
  ChevronDown,
  Globe,
  Menu,
  X,
  LogOut,
  Check
} from "lucide-react";
import { NETWORKS, type NetworkKey } from "@/lib/web3-config";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  // Find current network
  const currentNetwork = Object.entries(NETWORKS).find(([, network]) => network.id === chainId)?.[1] || NETWORKS.celo;

  const handleNetworkSwitch = (networkKey: NetworkKey) => {
    const network = NETWORKS[networkKey];
    switchChain({ chainId: network.id });
    setIsNetworkOpen(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/c098babc-78fa-4925-88df-3c53fa0f1f10.png" 
              alt="Festify" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gradient-hero">
              Festify
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#create" className="text-foreground hover:text-primary transition-colors">
              Create Card
            </a>
            <a href="#collection" className="text-foreground hover:text-primary transition-colors">
              My Collection
            </a>
            <a href="#referrals" className="text-foreground hover:text-primary transition-colors">
              Referrals
            </a>
          </nav>

          {/* Network Selector & Wallet */}
          <div className="flex items-center space-x-4">
            {/* Network Selector - Only show when connected */}
            {isConnected && (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="h-9 px-3 text-sm btn-network"
                  onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                >
                  <div className={`network-indicator ${currentNetwork.color} mr-2`} />
                  <Globe className="h-4 w-4 mr-1" />
                  {currentNetwork.name}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>

                {/* Network Dropdown */}
                {isNetworkOpen && (
                  <Card className="absolute top-full mt-2 right-0 w-48 p-2 z-50 bg-popover border shadow-lg">
                    <div className="space-y-1">
                      {Object.entries(NETWORKS).map(([key, network]) => (
                        <Button
                          key={key}
                          variant="ghost"
                          className="w-full justify-start text-sm h-8"
                          onClick={() => handleNetworkSwitch(key as NetworkKey)}
                        >
                          <div className={`network-indicator ${network.color} mr-2`} />
                          {network.name}
                          {network.id === chainId && (
                            <Check className="h-3 w-3 ml-auto text-success" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Wallet Connection */}
            {isConnected && address ? (
              <div className="flex items-center space-x-2">
                <Card className="px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="network-indicator bg-success" />
                    <span className="text-sm font-medium">{formatAddress(address)}</span>
                  </div>
                </Card>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => disconnect()}
                  className="hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                className="btn-hero h-9"
                onClick={() => open()}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <a href="#dashboard" className="block text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#create" className="block text-foreground hover:text-primary transition-colors">
              Create Card
            </a>
            <a href="#collection" className="block text-foreground hover:text-primary transition-colors">
              My Collection
            </a>
            <a href="#referrals" className="block text-foreground hover:text-primary transition-colors">
              Referrals
            </a>
            
            {/* Mobile Network Selector */}
            {isConnected && (
              <div className="pt-3 border-t border-border">
                <p className="text-sm font-medium mb-2">Switch Network:</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(NETWORKS).map(([key, network]) => (
                    <Button
                      key={key}
                      variant="ghost"
                      className="justify-start text-sm h-8"
                      onClick={() => handleNetworkSwitch(key as NetworkKey)}
                    >
                      <div className={`network-indicator ${network.color} mr-2`} />
                      {network.name}
                      {network.id === chainId && (
                        <Check className="h-3 w-3 ml-auto text-success" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};