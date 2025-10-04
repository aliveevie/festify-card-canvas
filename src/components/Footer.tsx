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
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-accent/3 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/Transparent Logo.png" 
                  alt="Festify" 
                  className="h-12 w-12"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md opacity-50" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient-hero leading-none">
                  Festify
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Premium NFT Cards
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Experience the pinnacle of Web3 greeting card technology. Send personalized, 
              premium NFT greeting cards across multiple blockchain networks with enterprise-grade reliability.
            </p>
            
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/5 transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/5 transition-all duration-200">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/5 transition-all duration-200">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Product</h3>
            <div className="space-y-4 text-sm">
              <a href="#create" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Create Premium Cards
              </a>
              <a href="#gallery" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Explore Gallery
              </a>
              <a href="#collection" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                My Collection
              </a>
              <a href="#referrals" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Referral Program
              </a>
            </div>
          </div>

          {/* Networks */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Supported Networks</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3 group">
                <div className="network-indicator network-celo w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">Celo Mainnet</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="network-indicator network-base w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">Base Mainnet</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="network-indicator network-optimism w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">Optimism Mainnet</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="network-indicator network-lisk w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">Lisk Mainnet</span>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Community</h3>
            <div className="space-y-4 text-sm">
              <a href="#docs" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Documentation
              </a>
              <a href="#support" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Premium Support
              </a>
              <a href="#blog" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Blog
              </a>
              <a href="#changelog" className="block text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1">
                Changelog
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Festify Premium. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive animate-pulse" />
            <span>for the premium Web3 community</span>
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};