import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Github, 
  MessageCircle,
  Heart,
  Sparkles
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
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
            
            <p className="text-muted-foreground">
              Send personalized greeting card NFTs across multiple blockchain networks. 
              Celebrate every moment with blockchain-powered cards.
            </p>
            
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-3 text-sm">
              <a href="#create" className="block text-muted-foreground hover:text-primary transition-colors">
                Create Cards
              </a>
              <a href="#gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                Explore Gallery
              </a>
              <a href="#collection" className="block text-muted-foreground hover:text-primary transition-colors">
                My Collection
              </a>
              <a href="#referrals" className="block text-muted-foreground hover:text-primary transition-colors">
                Referral Program
              </a>
            </div>
          </div>

          {/* Networks */}
          <div className="space-y-4">
            <h3 className="font-semibold">Supported Networks</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="network-indicator network-celo w-3 h-3" />
                <span className="text-muted-foreground">Celo Mainnet</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="network-indicator network-base w-3 h-3" />
                <span className="text-muted-foreground">Base Mainnet</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="network-indicator network-optimism w-3 h-3" />
                <span className="text-muted-foreground">Optimism Mainnet</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="network-indicator network-lisk w-3 h-3" />
                <span className="text-muted-foreground">Lisk Mainnet</span>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="space-y-3 text-sm">
              <a href="#docs" className="block text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#support" className="block text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
              <a href="#blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </a>
              <a href="#changelog" className="block text-muted-foreground hover:text-primary transition-colors">
                Changelog
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Festify. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive" />
            <span>for the blockchain community</span>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
};