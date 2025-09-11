import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  ChevronDown,
  Globe,
  Menu,
  X
} from "lucide-react";

const NETWORKS = [
  { id: 'celo', name: 'Celo', color: 'network-celo' },
  { id: 'base', name: 'Base', color: 'network-base' },
  { id: 'optimism', name: 'Optimism', color: 'network-optimism' },
  { id: 'lisk', name: 'Lisk', color: 'network-lisk' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
            {/* Network Selector */}
            <Card className="relative">
              <Button
                variant="ghost"
                className="h-9 px-3 text-sm"
                onClick={() => {/* Network selector logic */}}
              >
                <div className={`network-indicator ${selectedNetwork.color} mr-2`} />
                <Globe className="h-4 w-4 mr-1" />
                {selectedNetwork.name}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </Card>

            {/* Wallet Connection */}
            {isWalletConnected ? (
              <Card className="px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="network-indicator bg-success" />
                  <span className="text-sm font-medium">0x1234...5678</span>
                </div>
              </Card>
            ) : (
              <Button 
                className="btn-hero h-9"
                onClick={() => setIsWalletConnected(true)}
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
          </nav>
        </div>
      )}
    </header>
  );
};