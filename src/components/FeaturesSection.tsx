import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  Globe, 
  Gift, 
  Users, 
  Heart,
  Sparkles,
  Coins,
  Share2
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Multi-Chain Excellence",
    description: "Seamlessly send premium greeting cards across Celo, Base, Optimism, and Lisk networks with enterprise-grade reliability",
    color: "text-network-base",
    bgColor: "bg-gradient-to-br from-network-base/10 to-network-base/5",
    gradient: "from-network-base/20 to-network-base/5"
  },
  {
    icon: Gift,
    title: "Premium Festival Collection",
    description: "Choose from 25+ meticulously designed festival themes, each crafted with attention to detail and cultural authenticity",
    color: "text-primary",
    bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Your precious memories are permanently secured on-chain with military-grade encryption and decentralized storage",
    color: "text-success",
    bgColor: "bg-gradient-to-br from-success/10 to-success/5",
    gradient: "from-success/20 to-success/5"
  },
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "Experience instant card delivery with our optimized smart contracts and advanced blockchain infrastructure",
    color: "text-warning",
    bgColor: "bg-gradient-to-br from-warning/10 to-warning/5",
    gradient: "from-warning/20 to-warning/5"
  },
  {
    icon: Users,
    title: "Exclusive Community",
    description: "Join our premium community and earn exclusive rewards through our sophisticated referral program",
    color: "text-accent",
    bgColor: "bg-gradient-to-br from-accent/10 to-accent/5",
    gradient: "from-accent/20 to-accent/5"
  },
  {
    icon: Coins,
    title: "Cost Optimized",
    description: "Advanced gas optimization ensures minimal transaction costs while maintaining maximum security and speed",
    color: "text-network-celo",
    bgColor: "bg-gradient-to-br from-network-celo/10 to-network-celo/5",
    gradient: "from-network-celo/20 to-network-celo/5"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2" />
              Premium Features
          </Badge>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gradient-hero leading-tight">
            Why Choose
            <span className="block">Festify Premium?</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience the pinnacle of Web3 greeting card technology with our 
            enterprise-grade platform designed for discerning users who demand excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-8 space-y-6">
                <div className={`w-20 h-20 rounded-3xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            </Card>
          ))}
        </div>

        {/* Premium Network Support Banner */}
        <div className="mt-32">
          <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/80 to-accent/5 border-2 border-primary/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative p-12 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-gradient-hero">
                    Multi-Chain Excellence
              </h3>
              
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Experience seamless cross-chain functionality with our premium network support. 
                    Send greeting cards across the most advanced blockchain networks with enterprise-grade reliability.
              </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center space-y-4 group">
                    <div className="relative">
                      <div className="network-indicator network-celo w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-network-celo/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-foreground">Celo</span>
                      <p className="text-sm text-muted-foreground">Mobile-first</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4 group">
                    <div className="relative">
                      <div className="network-indicator network-base w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-network-base/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-foreground">Base</span>
                      <p className="text-sm text-muted-foreground">Coinbase L2</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4 group">
                    <div className="relative">
                      <div className="network-indicator network-optimism w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-network-optimism/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-foreground">Optimism</span>
                      <p className="text-sm text-muted-foreground">Superchain</p>
                    </div>
                </div>
                
                  <div className="flex flex-col items-center space-y-4 group">
                    <div className="relative">
                      <div className="network-indicator network-lisk w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-network-lisk/20 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-foreground">Lisk</span>
                      <p className="text-sm text-muted-foreground">Modular</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 rounded-full border border-primary/20">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Enterprise-Grade Multi-Chain Infrastructure</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};