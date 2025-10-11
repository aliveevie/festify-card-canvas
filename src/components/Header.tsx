import { useState } from "react";
import { Link } from "react-router-dom";
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
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/Transparent Logo.png" 
                alt="Festify" 
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient-hero leading-none">
                Festify
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Premium NFT Cards
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/dashboard" className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
              Dashboard
            </Link>
            <Link to="/create" className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
              Create Card
            </Link>
            <a href="#collection" className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
              Collection
            </a>
            <a href="#referrals" className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
              Referrals
            </a>
          </nav>

          {/* Network Selector & Wallet */}
          <div className="flex items-center space-x-3">
            {/* Network Selector - Only show when connected */}
            {isConnected && (
              <div className="relative">
                <Button
                  variant="outline"
                  className="h-10 px-4 text-sm border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                >
                  <div className={`network-indicator ${currentNetwork.color} mr-2`} />
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{currentNetwork.name}</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>

                {/* Network Dropdown */}
                {isNetworkOpen && (
                  <Card className="absolute top-full mt-2 right-0 w-56 p-3 z-50 bg-card/95 backdrop-blur-xl border border-border/50 shadow-xl">
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground px-2 py-1">Select Network</div>
                      {Object.entries(NETWORKS).map(([key, network]) => (
                        <Button
                          key={key}
                          variant="ghost"
                          className="w-full justify-start text-sm h-10 hover:bg-primary/5"
                          onClick={() => handleNetworkSwitch(key as NetworkKey)}
                        >
                          <div className={`network-indicator ${network.color} mr-3`} />
                          <span className="flex-1 text-left">{network.name}</span>
                          {network.id === chainId && (
                            <Check className="h-4 w-4 text-primary" />
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
                <Card className="px-4 py-2 border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="network-indicator bg-success animate-pulse" />
                    <span className="text-sm font-medium text-foreground">{formatAddress(address)}</span>
                  </div>
                </Card>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => disconnect()}
                  className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                className="btn-hero h-10 px-6 text-sm font-semibold shadow-lg hover:shadow-glow transition-all duration-300"
                onClick={() => open()}
              >
                <Wallet className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl shadow-lg">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <div className="grid gap-2">
              <Link to="/dashboard" className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Dashboard
              </Link>
              <Link to="/create" className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Create Card
              </Link>
              <a href="#collection" className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Collection
              </a>
              <a href="#referrals" className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium">
                Referrals
              </a>
            </div>
            
            {/* Mobile Network Selector */}
            {isConnected && (
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm font-semibold mb-3 text-muted-foreground px-4">Switch Network</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(NETWORKS).map(([key, network]) => (
                    <Button
                      key={key}
                      variant="ghost"
                      className="justify-start text-sm h-12 hover:bg-primary/5"
                      onClick={() => handleNetworkSwitch(key as NetworkKey)}
                    >
                      <div className={`network-indicator ${network.color} mr-3`} />
                      <span className="flex-1 text-left">{network.name}</span>
                      {network.id === chainId && (
                        <Check className="h-4 w-4 text-primary" />
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