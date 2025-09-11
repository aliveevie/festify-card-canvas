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
    title: "Multi-Network Support",
    description: "Send cards across Celo, Base, Optimism, and Lisk networks seamlessly",
    color: "text-network-base",
    bgColor: "bg-network-base/10"
  },
  {
    icon: Gift,
    title: "25 Festival Themes",
    description: "From Christmas to Diwali, celebrate every occasion with beautiful themes",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: Shield,
    title: "Secure & Decentralized",
    description: "Your greeting cards are stored on-chain, ensuring permanent memories",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Cards are delivered instantly to recipients across any supported network",
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    icon: Users,
    title: "Referral Rewards",
    description: "Earn rewards by inviting friends to join the Festify community",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Coins,
    title: "Low Fees",
    description: "Optimized smart contracts ensure minimal transaction costs",
    color: "text-network-celo",
    bgColor: "bg-network-celo/10"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Platform Features
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-hero">
            Why Choose Festify?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of greeting cards with blockchain technology. 
            Send personalized, permanent messages that celebrate life's special moments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-elevated p-8 hover:scale-105 transition-all duration-300 group"
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Network Support Banner */}
        <div className="mt-24">
          <Card className="card-festive p-8 text-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gradient-hero">
                Supported Networks
              </h3>
              
              <p className="text-muted-foreground">
                Send greeting cards across multiple blockchain networks
              </p>
              
              <div className="flex justify-center items-center space-x-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="network-indicator network-celo w-6 h-6" />
                  <span className="text-sm font-medium">Celo</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="network-indicator network-base w-6 h-6" />
                  <span className="text-sm font-medium">Base</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="network-indicator network-optimism w-6 h-6" />
                  <span className="text-sm font-medium">Optimism</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="network-indicator network-lisk w-6 h-6" />
                  <span className="text-sm font-medium">Lisk</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};