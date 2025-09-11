import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract, useSwitchChain } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Gift, 
  Heart, 
  Star, 
  Sparkles,
  Send,
  Calendar,
  Users,
  ChevronRight,
  Wallet,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  ExternalLink
} from "lucide-react";
import { NETWORKS, type NetworkKey } from "@/lib/web3-config";
import { abi } from "@/networks/abi.json";

const festivals = [
  { id: 'christmas', name: 'Christmas', emoji: '🎄', color: 'bg-red-500' },
  { id: 'newyear', name: 'New Year', emoji: '🎊', color: 'bg-purple-500' },
  { id: 'valentines', name: 'Valentine\'s', emoji: '💝', color: 'bg-pink-500' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂', color: 'bg-yellow-500' },
  { id: 'diwali', name: 'Diwali', emoji: '🪔', color: 'bg-orange-500' },
  { id: 'eid', name: 'Eid', emoji: '🌙', color: 'bg-green-500' },
  { id: 'thanksgiving', name: 'Thanksgiving', emoji: '🦃', color: 'bg-amber-600' },
  { id: 'halloween', name: 'Halloween', emoji: '🎃', color: 'bg-orange-600' },
];

const templates = [
  {
    id: 1,
    title: "Warm Wishes",
    preview: "Sending you warm wishes and heartfelt greetings on this special occasion..."
  },
  {
    id: 2,
    title: "Celebration Time",
    preview: "It's time to celebrate! May this special day bring you joy and happiness..."
  },
  {
    id: 3,
    title: "Best Wishes",
    preview: "Wishing you all the best on this wonderful day. May your dreams come true..."
  },
  {
    id: 4,
    title: "Custom Message",
    preview: "Write your own personalized message..."
  }
];

export default function CreateCard() {
  const [selectedFestival, setSelectedFestival] = useState(festivals[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [customMessage, setCustomMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkKey>('celo');
  const [metadataURI, setMetadataURI] = useState("");
  
  const { address, isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();

  // Get current network
  const currentNetwork = Object.entries(NETWORKS).find(([, network]) => network.id === chainId)?.[1] || NETWORKS.celo;
  const contractAddress = NETWORKS[selectedNetwork].contractAddress;

  // Read contract data
  const { data: mintFee, isLoading: isLoadingFee } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'mintFee',
    chainId: NETWORKS[selectedNetwork].id,
  });

  // Write contract
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Generate metadata URI (simplified for demo)
  useEffect(() => {
    if (selectedFestival && selectedTemplate && recipient) {
      const message = selectedTemplate.id === 4 && customMessage 
        ? customMessage 
        : selectedTemplate.preview;
      
      const metadata = {
        name: `${selectedFestival.name} Greeting Card`,
        description: message,
        image: `https://festify.com/cards/${selectedFestival.id}.png`,
        attributes: [
          { trait_type: "Festival", value: selectedFestival.name },
          { trait_type: "Template", value: selectedTemplate.title },
          { trait_type: "Sender", value: address || "Unknown" },
          { trait_type: "Recipient", value: recipient }
        ]
      };
      
      // In a real app, you'd upload this to IPFS or similar
      setMetadataURI(JSON.stringify(metadata));
    }
  }, [selectedFestival, selectedTemplate, customMessage, recipient, address]);

  const handleMint = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!recipient) {
      toast({
        title: "Recipient Required",
        description: "Please enter a recipient address.",
        variant: "destructive",
      });
      return;
    }

    if (selectedTemplate.id === 4 && !customMessage.trim()) {
      toast({
        title: "Custom Message Required",
        description: "Please enter your custom message.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Switch to selected network if needed
      if (chainId !== NETWORKS[selectedNetwork].id) {
        try {
          await switchChain({ chainId: NETWORKS[selectedNetwork].id });
          // Wait a moment for the network switch to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (switchError) {
          console.error('Network switch failed:', switchError);
          toast({
            title: "Network Switch Failed",
            description: `Please manually switch to ${NETWORKS[selectedNetwork].name} in your wallet.`,
            variant: "destructive",
          });
          return;
        }
      }

      const message = selectedTemplate.id === 4 && customMessage 
        ? customMessage 
        : selectedTemplate.preview;

      writeContract({
        address: contractAddress as `0x${string}`,
        abi: abi,
        functionName: 'mintGreetingCard',
        args: [recipient as `0x${string}`, metadataURI, selectedFestival.name],
        value: mintFee || 0n, // Use contract fee or 0 if not available
        chainId: NETWORKS[selectedNetwork].id,
      });
    } catch (err) {
      console.error('Error minting card:', err);
      toast({
        title: "Transaction Failed",
        description: "Failed to mint greeting card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNetworkChange = (networkKey: string) => {
    setSelectedNetwork(networkKey as NetworkKey);
    // Reset any previous errors when changing networks
    if (error) {
      // The error will be cleared when the component re-renders
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getExplorerUrl = (hash: string) => {
    const network = NETWORKS[selectedNetwork];
    if (network.chain.blockExplorers?.default?.url) {
      return `${network.chain.blockExplorers.default.url}/tx/${hash}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <SEOHead 
        title="Create Greeting Card - Festify"
        description="Design and mint personalized NFT greeting cards for any festival. Choose from 8+ themes, customize your message, and send across multiple blockchains."
        url="https://www.festify.club/create"
      />
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2">
              <Gift className="h-4 w-4 mr-2" />
              Create Your Card
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient-hero">
              Design Your Perfect Greeting
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from 8 festival themes, customize your message, and send memorable 
              NFT greeting cards to your loved ones across multiple blockchains.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Creation Form */}
            <div className="space-y-8">
              {/* Network Selection */}
              <Card className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Select Network
                </h3>
                
                <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a network" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(NETWORKS).map(([key, network]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-2">
                          <div className={`network-indicator ${network.color} w-3 h-3 rounded-full`} />
                          <span>{network.name}</span>
                          <span className="text-muted-foreground">({network.currency})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Contract Address:</span>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      {formatAddress(contractAddress)}
                    </code>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span>Mint Fee:</span>
                    <span className="font-mono">
                      {isLoadingFee ? (
                        <span className="text-muted-foreground">Loading...</span>
                      ) : mintFee ? (
                        `${formatEther(mintFee)} ${NETWORKS[selectedNetwork].currency}`
                      ) : (
                        <span className="text-green-600">Free</span>
                      )}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Festival Selection */}
              <Card className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Choose Festival Theme
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {festivals.map((festival) => (
                    <button
                      key={festival.id}
                      onClick={() => setSelectedFestival(festival)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedFestival.id === festival.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{festival.emoji}</div>
                      <div className="text-xs font-medium">{festival.name}</div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Message Templates */}
              <Card className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Select Message Template
                </h3>
                
                <div className="space-y-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedTemplate.id === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium mb-1">{template.title}</div>
                      <div className="text-sm text-muted-foreground">{template.preview}</div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Custom Message */}
              {selectedTemplate.id === 4 && (
                <Card className="card-elevated p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-primary" />
                    Your Personal Message
                  </h3>
                  
                  <Textarea
                    placeholder="Write your heartfelt message here..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-32"
                    maxLength={500}
                  />
                  
                  <div className="text-right text-sm text-muted-foreground mt-2">
                    {customMessage.length}/500 characters
                  </div>
                </Card>
              )}

              {/* Recipient */}
              <Card className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Recipient Address
                </h3>
                
                <Input
                  placeholder="0x... or ENS name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="mb-4"
                />
                
                <p className="text-sm text-muted-foreground">
                  Enter the recipient's wallet address or ENS name
                </p>
              </Card>
            </div>

            {/* Preview Card */}
            <div className="lg:sticky lg:top-24">
              <Card className="card-greeting p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className={`${selectedFestival.color} text-white`}>
                      {selectedFestival.emoji} {selectedFestival.name}
                    </Badge>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <Gift className="h-16 w-16 text-primary mx-auto animate-float" />
                    <h3 className="text-2xl font-bold text-gradient-hero">
                      Happy {selectedFestival.name}!
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedTemplate.id === 4 && customMessage 
                        ? customMessage 
                        : selectedTemplate.preview
                      }
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>From: {address ? formatAddress(address) : 'your.wallet'}</span>
                    <span>To: {recipient ? formatAddress(recipient) : 'recipient.wallet'}</span>
                  </div>
                </div>
              </Card>

              {/* Status Messages */}
              {isConnected && chainId !== NETWORKS[selectedNetwork].id && (
                <Alert className="mt-6" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You're connected to {currentNetwork?.name || 'Unknown Network'}, but need to be on {NETWORKS[selectedNetwork].name}. 
                    The app will automatically switch networks when you mint.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mt-6" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error.message?.includes('contract') 
                      ? `Contract not found on ${NETWORKS[selectedNetwork].name}. Please check the network selection.`
                      : error.message || 'Transaction failed. Please try again.'
                    }
                  </AlertDescription>
                </Alert>
              )}

              {isSuccess && (
                <Alert className="mt-6" variant="default">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Card minted successfully! 
                    {hash && getExplorerUrl(hash) && (
                      <a 
                        href={getExplorerUrl(hash)!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-primary hover:underline"
                      >
                        View on Explorer <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                {isConnected ? (
                  <>
                    <Button 
                      onClick={handleMint}
                      disabled={isPending || isConfirming || !recipient || (selectedTemplate.id === 4 && !customMessage.trim())}
                      className="btn-hero w-full text-lg py-4"
                    >
                      {isPending || isConfirming ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          {isPending ? 'Confirming...' : 'Minting...'}
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Mint & Send Card
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      Network: {NETWORKS[selectedNetwork].name} • 
                      Fee: {isLoadingFee ? 'Loading...' : mintFee ? `${formatEther(mintFee)} ${NETWORKS[selectedNetwork].currency}` : 'Free'}
                    </div>
                  </>
                ) : (
                  <>
                    <Button disabled className="btn-hero w-full text-lg py-4">
                      <Wallet className="h-5 w-5 mr-2" />
                      Connect Wallet to Continue
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      Please connect your wallet using the header button
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
