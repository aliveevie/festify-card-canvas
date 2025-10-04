import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WalletStatus } from "@/components/WalletStatus";
import { useAccount } from 'wagmi';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  Heart,
  Gift,
  Star,
  Users,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";

// Premium greeting card examples for slideshow - Diverse Cultural Celebrations
const greetingCards = [
  {
    id: 1,
    festival: "Ramadan",
    emoji: "🌙",
    color: "bg-gradient-to-r from-emerald-500 to-teal-600",
    title: "Ramadan Mubarak!",
    message: "May this blessed month of Ramadan bring you peace, spiritual growth, and countless blessings. May Allah accept your prayers and grant you strength throughout this holy month.",
    from: "ahmed.eth",
    to: "fatima.eth",
    badge: "Blessed Month",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(160,84%,39%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 2,
    festival: "Eid al-Fitr",
    emoji: "🌙✨",
    color: "bg-gradient-to-r from-amber-500 to-yellow-600",
    title: "Eid Mubarak!",
    message: "Wishing you and your family a joyous Eid al-Fitr filled with love, laughter, and sweet moments. May Allah bless you with happiness, prosperity, and good health.",
    from: "omar.eth",
    to: "aisha.eth",
    badge: "Festival of Breaking Fast",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(45,93%,47%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 3,
    festival: "Eid al-Adha",
    emoji: "🕌",
    color: "bg-gradient-to-r from-green-600 to-emerald-700",
    title: "Eid al-Adha Mubarak!",
    message: "May this blessed Eid al-Adha bring you closer to Allah and fill your heart with gratitude. Wishing you a meaningful celebration with your loved ones.",
    from: "yusuf.eth",
    to: "zainab.eth",
    badge: "Festival of Sacrifice",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(142,76%,36%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 4,
    festival: "Christmas",
    emoji: "🎄",
    color: "bg-gradient-to-r from-red-500 to-red-600",
    title: "Merry Christmas!",
    message: "Wishing you and your family a wonderful holiday season filled with joy, love, and happiness. May this Christmas bring you countless blessings and warm memories.",
    from: "alice.eth",
    to: "bob.eth",
    badge: "Christmas Special",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(0,84%,60%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 5,
    festival: "New Year",
    emoji: "🎊",
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    title: "Happy New Year!",
    message: "As we welcome another year of possibilities, may it bring you success, happiness, and countless moments of joy. Here's to new beginnings and endless opportunities!",
    from: "charlie.eth",
    to: "diana.eth",
    badge: "New Year 2024",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(262,83%,58%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 6,
    festival: "Diwali",
    emoji: "🪔",
    color: "bg-gradient-to-r from-orange-500 to-yellow-500",
    title: "Happy Diwali!",
    message: "May the divine light of Diwali bring you peace, prosperity, and happiness. Wishing you a festival of lights filled with love, joy, and countless blessings.",
    from: "priya.eth",
    to: "raj.eth",
    badge: "Festival of Lights",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(38,92%,50%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 7,
    festival: "Valentine's",
    emoji: "💝",
    color: "bg-gradient-to-r from-pink-500 to-rose-600",
    title: "Happy Valentine's Day!",
    message: "You are the sunshine that brightens my darkest days and the love that fills my heart with endless joy. Happy Valentine's Day, my dearest!",
    from: "emma.eth",
    to: "james.eth",
    badge: "Valentine's Special",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(330,81%,60%,0.1)_0%,transparent_70%)]"
  },
  {
    id: 8,
    festival: "Birthday",
    emoji: "🎂",
    color: "bg-gradient-to-r from-blue-500 to-purple-600",
    title: "Happy Birthday!",
    message: "Another year of amazing memories and wonderful adventures! May your special day be filled with love, laughter, and all your favorite things.",
    from: "mike.eth",
    to: "sarah.eth",
    badge: "Birthday Celebration",
    bgPattern: "bg-[radial-gradient(circle_at_center,hsla(217,91%,60%,0.1)_0%,transparent_70%)]"
  }
];

export const HeroSection = () => {
  const { isConnected } = useAccount();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % greetingCards.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % greetingCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + greetingCards.length) % greetingCards.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentCard = greetingCards[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:60px_60px]" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10">
          <div className="space-y-8">
              <div className="inline-flex items-center space-x-3">
                <Badge className="bg-white/10 text-white border-white/20 px-6 py-3 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                  Premium NFT Platform
              </Badge>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
                <span className="block">Premium</span>
                <span className="block text-gradient-festive bg-clip-text text-transparent">
                  Greeting Cards
                </span>
                <span className="block text-4xl lg:text-5xl text-white/80 font-light">
                  for Web3
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Create, mint, and send personalized NFT greeting cards across multiple 
                blockchain networks. Experience the future of digital celebrations with 
                our premium Web3 platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/create">
                <Button className="btn-hero text-lg px-10 py-5 h-auto shadow-2xl hover:shadow-glow transition-all duration-300">
                  <Send className="h-5 w-5 mr-3" />
                  Create Your Card
                  <div className="ml-2 h-2 w-2 bg-white/60 rounded-full animate-pulse" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-5 h-auto backdrop-blur-sm transition-all duration-300"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <Globe className="h-5 w-5 mr-3" />
                Explore Features
              </Button>
            </div>

            {/* Premium Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">25,847</div>
                <div className="text-white/70 font-medium">Cards Created</div>
                <div className="text-xs text-white/50 mt-1">+12% this month</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">4</div>
                <div className="text-white/70 font-medium">Blockchains</div>
                <div className="text-xs text-white/50 mt-1">Multi-chain support</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">8,234</div>
                <div className="text-white/70 font-medium">Active Users</div>
                <div className="text-xs text-white/50 mt-1">Growing community</div>
              </div>
            </div>
          </div>

          {/* Premium Visual Showcase */}
          <div className="relative">
            {!isConnected ? (
              <div className="relative z-10">
                {/* Premium Slideshow Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 ${currentCard.bgPattern} opacity-50`} />
                  
                  {/* Main Card with Enhanced Animation */}
                  <div className="relative">
                    <Card 
                      key={currentSlide}
                      className="relative overflow-hidden bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl border-2 border-white/30 shadow-2xl animate-scale-in"
                      style={{
                        transform: 'translateY(0) scale(1)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.85) 100%)'
                      }}
                    >
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-xl" />
                      
                      <div className="relative p-12 space-y-10">
                    <div className="flex items-center justify-between">
                          <Badge className={`${currentCard.color} text-white px-6 py-3 text-sm font-bold shadow-xl border-0 backdrop-blur-sm`}>
                            <span className="text-lg mr-2">{currentCard.emoji}</span>
                            {currentCard.badge}
                      </Badge>
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map((i) => (
                              <Star key={i} className="h-6 w-6 fill-accent text-accent drop-shadow-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                    </div>
                    
                        <div className="text-center space-y-8">
                          <div className="relative">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center animate-premium-float shadow-2xl">
                              <Gift className="h-12 w-12 text-primary drop-shadow-lg" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl animate-pulse" />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                              {currentCard.title}
                      </h3>
                            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                          </div>
                          
                          <p className="text-muted-foreground text-xl leading-relaxed max-w-md mx-auto font-medium">
                            {currentCard.message}
                      </p>
                    </div>
                    
                        <div className="flex items-center justify-between text-sm bg-gradient-to-r from-muted/40 to-muted/30 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-success to-emerald-500 rounded-full animate-pulse shadow-lg" />
                            <span className="font-semibold text-foreground">From: {currentCard.from}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse shadow-lg" />
                            <span className="font-semibold text-foreground">To: {currentCard.to}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Enhanced Navigation Controls */}
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevSlide}
                      className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-2xl"
                    >
                      <ChevronLeft className="h-8 w-8 text-white drop-shadow-lg" />
                    </Button>
                  </div>
                  
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextSlide}
                      className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-2xl"
                    >
                      <ChevronRight className="h-8 w-8 text-white drop-shadow-lg" />
                    </Button>
                  </div>

                  {/* Enhanced Auto-play Toggle */}
                  <div className="absolute top-6 right-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleAutoPlay}
                      className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
                    >
                      {isAutoPlaying ? (
                        <Pause className="h-5 w-5 text-white drop-shadow-lg" />
                      ) : (
                        <Play className="h-5 w-5 text-white drop-shadow-lg" />
                      )}
                    </Button>
                  </div>

                  {/* Enhanced Slide Indicators */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {greetingCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-4 w-4 rounded-full transition-all duration-300 shadow-lg ${
                          index === currentSlide 
                            ? 'bg-white scale-125 shadow-2xl' 
                            : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Festival Name Display */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-4 py-2 shadow-xl">
                      <span className="text-white font-bold text-sm drop-shadow-lg">
                        {currentCard.festival}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Premium Network Indicators */}
                <div className="absolute -top-6 -right-6">
                  <Card className="p-4 animate-premium-glow bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                    <div className="flex space-x-3">
                      <div className="network-indicator network-celo w-4 h-4" />
                      <div className="network-indicator network-base w-4 h-4" />
                      <div className="network-indicator network-optimism w-4 h-4" />
                      <div className="network-indicator network-lisk w-4 h-4" />
                    </div>
                    <div className="text-xs text-white/70 text-center mt-2 font-medium">
                      Multi-Chain
                  </div>
                </Card>
                </div>

                {/* Premium Badge */}
                <div className="absolute -bottom-4 -left-4">
                  <Card className="p-3 bg-gradient-to-r from-primary to-accent text-white shadow-xl animate-premium-glow">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-semibold">Premium NFT</span>
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              <WalletStatus />
            )}

            {/* Enhanced Background Cards */}
            <Card className="absolute top-16 right-16 w-80 h-56 -rotate-12 opacity-15 shadow-2xl animate-premium-float bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20" />
            <Card className="absolute bottom-16 left-16 w-80 h-56 rotate-12 opacity-15 shadow-2xl animate-premium-float bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20" style={{ animationDelay: '2s' }} />
            
            {/* Beautiful Floating Elements */}
            <div className="absolute top-1/4 left-8 w-20 h-20 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-xl animate-float shadow-2xl" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-1/4 right-8 w-24 h-24 bg-gradient-to-br from-accent/40 to-primary/40 rounded-full blur-xl animate-float shadow-2xl" style={{ animationDelay: '4s' }} />
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-lg animate-float shadow-xl" style={{ animationDelay: '5s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-md animate-float shadow-lg" style={{ animationDelay: '6s' }} />
            
            {/* Decorative Sparkles */}
            <div className="absolute top-20 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }} />
            <div className="absolute top-32 right-1/3 w-1 h-1 bg-white/80 rounded-full animate-pulse shadow-md" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-24 left-1/2 w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-40 right-1/4 w-1 h-1 bg-white/90 rounded-full animate-pulse shadow-md" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};