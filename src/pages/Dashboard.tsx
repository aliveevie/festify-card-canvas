import { useState, useEffect } from "react";
import { useAccount, useReadContract } from 'wagmi';
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Send, 
  Inbox, 
  Bell, 
  Settings, 
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Loader2,
  Gift,
  Calendar,
  User,
  ExternalLink,
  Eye,
  Sparkles,
  TrendingUp,
  Package,
  Heart,
  Zap,
  Clock,
  Star
} from "lucide-react";
import { NETWORKS } from "@/lib/web3-config";
import { abi } from "@/networks/abi.json";
import { Link } from "react-router-dom";

interface CardData {
  tokenId: bigint;
  sender?: string;
  recipient?: string;
  festival?: string;
  metadataURI?: string;
  timestamp?: string;
}

export default function Dashboard() {
  const { address, isConnected, chainId } = useAccount();
  const [activeTab, setActiveTab] = useState("overview");
  const [sentCards, setSentCards] = useState<CardData[]>([]);
  const [receivedCards, setReceivedCards] = useState<CardData[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  
  // Settings state (UI only - not implemented yet)
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");

  // Find current network
  const currentNetwork = Object.entries(NETWORKS).find(([, network]) => network.id === chainId)?.[1] || NETWORKS.celo;
  const contractAddress = currentNetwork.contractAddress;

  // Read sent greetings
  const { data: sentGreetingsData, isLoading: isLoadingSent } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'getSentGreetings',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!contractAddress,
    }
  });

  // Read received greetings
  const { data: receivedGreetingsData, isLoading: isLoadingReceived } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'getReceivedGreetings',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!contractAddress,
    }
  });

  // Read balance
  const { data: balance } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!contractAddress,
    }
  });

  // Process card data
  useEffect(() => {
    const loadCardData = async () => {
      if (!sentGreetingsData && !receivedGreetingsData) return;
      
      setIsLoadingCards(true);
      
      try {
        // Process sent cards
        if (sentGreetingsData && Array.isArray(sentGreetingsData)) {
          const sent = (sentGreetingsData as bigint[]).map((tokenId) => ({
            tokenId,
            sender: address,
          }));
          setSentCards(sent);
        }

        // Process received cards
        if (receivedGreetingsData && Array.isArray(receivedGreetingsData)) {
          const received = (receivedGreetingsData as bigint[]).map((tokenId) => ({
            tokenId,
            recipient: address,
          }));
          setReceivedCards(received);
        }
      } catch (error) {
        console.error('Error loading card data:', error);
      } finally {
        setIsLoadingCards(false);
      }
    };

    loadCardData();
  }, [sentGreetingsData, receivedGreetingsData, address]);

  const formatAddress = (addr?: string) => {
    if (!addr) return "Unknown";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getExplorerUrl = (tokenId: bigint) => {
    if (currentNetwork.chain.blockExplorers?.default?.url) {
      return `${currentNetwork.chain.blockExplorers.default.url}/token/${contractAddress}?a=${tokenId}`;
    }
    return null;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <SEOHead 
          title="Dashboard - Festify"
          description="Manage your greeting cards, view notifications, and configure alert settings"
          url="https://www.festify.club/dashboard"
        />
        <Header />
        
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Please connect your wallet to view your dashboard and manage your greeting cards.
            </p>
            <Button className="btn-hero" onClick={() => {}}>
              Connect Wallet
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <SEOHead 
        title="Dashboard - Festify"
        description="Manage your greeting cards, view notifications, and configure alert settings"
        url="https://www.festify.club/dashboard"
      />
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Dashboard
              </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient-hero mb-4">
              Welcome back!
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Manage your greeting cards and stay connected with loved ones across the blockchain
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center">
                    <Send className="h-6 w-6 text-blue-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {isLoadingSent ? <Loader2 className="h-8 w-8 animate-spin" /> : sentCards.length}
                </div>
                <div className="text-sm font-medium text-muted-foreground">Cards Sent</div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/5 rounded-tl-full" />
            </Card>

            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center">
                    <Inbox className="h-6 w-6 text-purple-600" />
                  </div>
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {isLoadingReceived ? <Loader2 className="h-8 w-8 animate-spin" /> : receivedCards.length}
                </div>
                <div className="text-sm font-medium text-muted-foreground">Cards Received</div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/5 rounded-tl-full" />
            </Card>

            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 flex items-center justify-center">
                    <Package className="h-6 w-6 text-amber-600" />
                  </div>
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {balance ? balance.toString() : '0'}
                </div>
                <div className="text-sm font-medium text-muted-foreground">Total Cards Owned</div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-500/5 rounded-tl-full" />
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 p-1.5 h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white px-6 py-3">
                <Star className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="sent" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white px-6 py-3">
                <Send className="h-4 w-4 mr-2" />
                Sent Cards
              </TabsTrigger>
              <TabsTrigger value="received" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white px-6 py-3">
                <Inbox className="h-4 w-4 mr-2" />
                Received Cards
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white px-6 py-3">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white px-6 py-3">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Gift className="h-6 w-6 mr-3 text-primary" />
                    Quick Actions
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/create">
                      <Button className="w-full h-20 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all">
                        <div className="flex items-center space-x-3">
                          <Send className="h-6 w-6" />
                          <div className="text-left">
                            <div className="font-bold text-base">Create New Card</div>
                            <div className="text-xs text-white/80">Send a greeting to someone special</div>
                          </div>
                        </div>
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-20 border-2 hover:border-primary/50 hover:bg-primary/5"
                      onClick={() => setActiveTab("received")}
                    >
                      <div className="flex items-center space-x-3">
                        <Inbox className="h-6 w-6" />
                        <div className="text-left">
                          <div className="font-bold text-base">View Received Cards</div>
                          <div className="text-xs text-muted-foreground">See cards sent to you</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Clock className="h-6 w-6 mr-3 text-primary" />
                    Recent Activity
                  </h3>
                  
                  {isLoadingCards ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : sentCards.length === 0 && receivedCards.length === 0 ? (
                    <div className="text-center py-12">
                      <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No activity yet</p>
                      <Link to="/create">
                        <Button className="btn-hero">Send Your First Card</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[...sentCards.slice(0, 3), ...receivedCards.slice(0, 3)]
                        .slice(0, 5)
                        .map((card, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              {sentCards.includes(card) ? (
                                <Send className="h-6 w-6 text-primary" />
                              ) : (
                                <Inbox className="h-6 w-6 text-accent" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold">
                                {sentCards.includes(card) ? 'Sent Card' : 'Received Card'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Token ID: #{card.tokenId.toString()}
                              </div>
                            </div>
                          </div>
                          {getExplorerUrl(card.tokenId) && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={getExplorerUrl(card.tokenId)!} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Sent Cards Tab */}
            <TabsContent value="sent" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Send className="h-6 w-6 mr-3 text-primary" />
                      Cards You've Sent
                    </h3>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {sentCards.length} Total
                    </Badge>
                  </div>

                  {isLoadingSent || isLoadingCards ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : sentCards.length === 0 ? (
                    <div className="text-center py-12">
                      <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">You haven't sent any cards yet</p>
                      <Link to="/create">
                        <Button className="btn-hero">Create Your First Card</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sentCards.map((card, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary/50">
                          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Gift className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                              <Badge className="mb-3">Sent Card</Badge>
                              <div className="text-lg font-bold">Token #{card.tokenId.toString()}</div>
                            </div>
                          </div>
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Network:</span>
                              <span className="font-medium">{currentNetwork.name}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">From:</span>
                              <span className="font-medium">{formatAddress(card.sender)}</span>
                            </div>
                            {getExplorerUrl(card.tokenId) && (
                              <Button variant="outline" className="w-full" asChild>
                                <a href={getExplorerUrl(card.tokenId)!} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View on Explorer
                                </a>
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Received Cards Tab */}
            <TabsContent value="received" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Inbox className="h-6 w-6 mr-3 text-primary" />
                      Cards You've Received
                    </h3>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {receivedCards.length} Total
                    </Badge>
                  </div>

                  {isLoadingReceived || isLoadingCards ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : receivedCards.length === 0 ? (
                    <div className="text-center py-12">
                      <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">No cards received yet</p>
                      <p className="text-sm text-muted-foreground">Share your wallet address to receive greeting cards!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {receivedCards.map((card, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 hover:border-accent/50">
                          <div className="bg-gradient-to-br from-accent/10 to-purple-500/10 p-6">
                            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Heart className="h-8 w-8 text-accent" />
                            </div>
                            <div className="text-center">
                              <Badge className="mb-3 bg-accent/20 text-accent border-accent/30">Received Card</Badge>
                              <div className="text-lg font-bold">Token #{card.tokenId.toString()}</div>
                            </div>
                          </div>
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Network:</span>
                              <span className="font-medium">{currentNetwork.name}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">To:</span>
                              <span className="font-medium">{formatAddress(card.recipient)}</span>
                            </div>
                            {getExplorerUrl(card.tokenId) && (
                              <Button variant="outline" className="w-full" asChild>
                                <a href={getExplorerUrl(card.tokenId)!} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View on Explorer
                                </a>
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Bell className="h-6 w-6 mr-3 text-primary" />
                    Notifications
                  </h3>

                  <Alert className="mb-6 border-blue-200 bg-blue-50">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Coming Soon!</strong> Real-time notifications for card activity are being developed.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    {/* Sample notifications */}
                    <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Welcome to Festify!</div>
                        <p className="text-sm text-muted-foreground">
                          Start creating and sending personalized NFT greeting cards today.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">Just now</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg opacity-60">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Feature Update</div>
                        <p className="text-sm text-muted-foreground">
                          ENS name support is now available for sending cards!
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">1 hour ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Settings className="h-6 w-6 mr-3 text-primary" />
                    Alert Settings
                  </h3>

                  <Alert className="mb-8 border-amber-200 bg-amber-50">
                    <Zap className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>Work in Progress!</strong> These settings are currently being developed. Changes will be saved once the feature is ready.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-8">
                    {/* Email Notifications */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-semibold">Email Notifications</div>
                            <div className="text-sm text-muted-foreground">Receive email alerts for card activity</div>
                          </div>
                        </div>
                        <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} disabled />
                      </div>

                      {emailAlerts && (
                        <div className="ml-8 space-y-4">
                          <div>
                            <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email Address</Label>
                            <Input 
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              className="max-w-md"
                              disabled
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">Get instant browser notifications</div>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} disabled />
                    </div>

                    {/* Weekly Digest */}
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">Weekly Digest</div>
                          <div className="text-sm text-muted-foreground">Receive a weekly summary of your activity</div>
                        </div>
                      </div>
                      <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} disabled />
                    </div>

                    {/* Account Info */}
                    <div className="pt-4">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        Account Information
                      </h4>
                      <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Wallet Address:</span>
                          <code className="font-mono">{formatAddress(address)}</code>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Network:</span>
                          <span className="font-medium">{currentNetwork.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cards Owned:</span>
                          <span className="font-medium">{balance?.toString() || '0'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

