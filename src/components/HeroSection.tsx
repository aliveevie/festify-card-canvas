import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WalletStatus } from "@/components/WalletStatus";
import { useAccount } from 'wagmi';
import { 
  Sparkles, 
  Send, 
  Heart,
  Gift,
  Star,
  Users,
  Zap,
  Globe
} from "lucide-react";

export const HeroSection = () => {
  const { isConnected } = useAccount();

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Cross-Chain NFT Greeting Cards
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Send Festive
                <span className="block text-gradient-festive">
                  Greetings Across
                </span>
                <span className="block">
                  Any Blockchain
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-lg">
                Create personalized greeting card NFTs and send them to loved ones 
                across Celo, Base, Optimism, and Lisk networks. Celebrate every moment 
                with blockchain-powered cards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isConnected ? (
                <Button className="btn-hero text-lg px-8 py-4">
                  <Send className="h-5 w-5 mr-2" />
                  Create Your First Card
                </Button>
              ) : (
                <Button className="btn-hero text-lg px-8 py-4" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                  <Send className="h-5 w-5 mr-2" />
                  Get Started
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                <Globe className="h-5 w-5 mr-2" />
                Explore Gallery
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10,234</div>
                <div className="text-white/70">Cards Sent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-white/70">Networks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2,156</div>
                <div className="text-white/70">Happy Users</div>
              </div>
            </div>
          </div>

          {/* Visual / Wallet Status */}
          <div className="relative">
            {!isConnected ? (
              <div className="relative z-10">
                {/* Main Card */}
                <Card className="card-greeting p-8 animate-float">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-accent text-accent-foreground">
                        Christmas 🎄
                      </Badge>
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <Gift className="h-16 w-16 text-primary mx-auto" />
                      <h3 className="text-2xl font-bold text-gradient-hero">
                        Merry Christmas!
                      </h3>
                      <p className="text-muted-foreground">
                        Wishing you and your family a wonderful holiday season 
                        filled with joy, love, and happiness.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>From: alice.eth</span>
                      <span>To: bob.eth</span>
                    </div>
                  </div>
                </Card>

                {/* Floating Network Indicators */}
                <div className="absolute -top-4 -right-4">
                  <Card className="p-3 animate-glow">
                    <div className="flex space-x-2">
                      <div className="network-indicator network-celo" />
                      <div className="network-indicator network-base" />
                      <div className="network-indicator network-optimism" />
                      <div className="network-indicator network-lisk" />
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              <WalletStatus />
            )}

            {/* Background cards */}
            <Card className="card-festive absolute top-8 right-8 w-64 h-40 -rotate-12 opacity-30" />
            <Card className="card-festive absolute bottom-8 left-8 w-64 h-40 rotate-12 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};