import { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useReadContract, useSwitchChain } from 'wagmi';
import { parseEther, formatEther, createWalletClient, custom, encodeFunctionData, createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { getReferralTag, submitReferral } from '@divvi/referral-sdk';
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
  ExternalLink,
  Crown,
  Wand2,
  Eye,
  ArrowRight,
  Zap,
  Shield,
  Palette,
  MessageSquare,
  User,
  Network,
  Coins
} from "lucide-react";
import { NETWORKS, type NetworkKey } from "@/lib/web3-config";
import { abi } from "@/networks/abi.json";

// Divvi consumer address for referral tracking
const DIVVI_CONSUMER_ADDRESS = '0x4eA48e01F1314Db0925653e30617B254D1cf5366';

// Design Themes
const designThemes = [
  {
    id: 'gold',
    name: "Golden Luxury",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    color: "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500",
    emoji: "👑",
    description: "Premium gold theme"
  },
  {
    id: 'ocean',
    name: "Ocean Blue",
    gradient: "from-blue-400 via-cyan-500 to-teal-600",
    color: "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600",
    emoji: "🌊",
    description: "Calming ocean vibes"
  },
  {
    id: 'sunset',
    name: "Sunset Glow",
    gradient: "from-pink-400 via-red-500 to-orange-500",
    color: "bg-gradient-to-r from-pink-400 via-red-500 to-orange-500",
    emoji: "🌅",
    description: "Warm sunset colors"
  },
  {
    id: 'forest',
    name: "Forest Green",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    color: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600",
    emoji: "🌲",
    description: "Natural forest theme"
  },
  {
    id: 'royal',
    name: "Royal Purple",
    gradient: "from-purple-500 via-violet-600 to-indigo-700",
    color: "bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-700",
    emoji: "💜",
    description: "Regal purple theme"
  },
  {
    id: 'rose',
    name: "Rose Gold",
    gradient: "from-rose-400 via-pink-500 to-rose-600",
    color: "bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600",
    emoji: "🌹",
    description: "Elegant rose gold"
  }
];

// Premium Card Templates
const premiumCards = [
  {
    id: 'premium-1',
    title: "Golden Celebration",
    category: "Premium NFT",
    preview: "May this special day shine as bright as gold in your heart...",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    emoji: "👑",
    price: "0.01 ETH",
    features: ["Animated", "Rare", "Collectible"]
  },
  {
    id: 'premium-2',
    title: "Diamond Wishes",
    category: "Premium NFT",
    preview: "Sending you wishes as precious and rare as diamonds...",
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    emoji: "💎",
    price: "0.02 ETH",
    features: ["3D Effect", "Exclusive", "Limited"]
  },
  {
    id: 'premium-3',
    title: "Crystal Blessings",
    category: "Premium NFT",
    preview: "May crystal-clear blessings flow into your life...",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    emoji: "🔮",
    price: "0.015 ETH",
    features: ["Interactive", "Premium", "Unique"]
  },
  {
    id: 'premium-4',
    title: "Royal Greetings",
    category: "Premium NFT",
    preview: "Royal greetings for someone truly special in your life...",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    emoji: "🏰",
    price: "0.025 ETH",
    features: ["Royal", "Exclusive", "Animated"]
  }
];

// Free Card Templates
const freeCards = [
  {
    id: 'free-1',
    title: "Warm Wishes",
    category: "Free",
    preview: "Sending you warm wishes and heartfelt greetings...",
    gradient: "from-green-400 to-blue-500",
    emoji: "💚",
    price: "Free",
    features: ["Classic", "Heartfelt"]
  },
  {
    id: 'free-2',
    title: "Celebration Time",
    category: "Free",
    preview: "It's time to celebrate! May joy fill your day...",
    gradient: "from-pink-400 to-purple-500",
    emoji: "🎉",
    price: "Free",
    features: ["Festive", "Joyful"]
  },
  {
    id: 'free-3',
    title: "Best Wishes",
    category: "Free",
    preview: "Wishing you all the best on this wonderful day...",
    gradient: "from-orange-400 to-red-500",
    emoji: "⭐",
    price: "Free",
    features: ["Classic", "Sincere"]
  },
  {
    id: 'free-4',
    title: "Blessed Day",
    category: "Free",
    preview: "May this day be filled with countless blessings...",
    gradient: "from-teal-400 to-green-500",
    emoji: "🙏",
    price: "Free",
    features: ["Spiritual", "Blessed"]
  }
];

const festivals = [
  { id: 'ramadan', name: 'Ramadan', emoji: '🌙', color: 'bg-emerald-500' },
  { id: 'eid-fitr', name: 'Eid al-Fitr', emoji: '🌙✨', color: 'bg-amber-500' },
  { id: 'eid-adha', name: 'Eid al-Adha', emoji: '🕌', color: 'bg-green-600' },
  { id: 'christmas', name: 'Christmas', emoji: '🎄', color: 'bg-red-500' },
  { id: 'newyear', name: 'New Year', emoji: '🎊', color: 'bg-purple-500' },
  { id: 'diwali', name: 'Diwali', emoji: '🪔', color: 'bg-orange-500' },
  { id: 'valentines', name: 'Valentine\'s', emoji: '💝', color: 'bg-pink-500' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂', color: 'bg-yellow-500' },
  { id: 'thanksgiving', name: 'Thanksgiving', emoji: '🦃', color: 'bg-amber-600' },
  { id: 'halloween', name: 'Halloween', emoji: '🎃', color: 'bg-orange-600' },
];

export default function CreateCard() {
  // Card selection state
  const [cardType, setCardType] = useState<'free' | 'premium'>('free');
  const [selectedCard, setSelectedCard] = useState(freeCards[0]);
  const [selectedFestival, setSelectedFestival] = useState(festivals[0]);
  const [selectedTheme, setSelectedTheme] = useState(designThemes[0]); // Default to gold theme
  const [customMessage, setCustomMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkKey>('celo');
  const [metadataURI, setMetadataURI] = useState("");
  
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [recipientValid, setRecipientValid] = useState<boolean | null>(null);
  
  const { address, isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();
  
  // Track actual wallet chain ID (may differ from wagmi's chainId)
  const [actualWalletChainId, setActualWalletChainId] = useState<number | null>(null);

  // Get actual chain ID from wallet provider
  useEffect(() => {
    const getWalletChainId = async () => {
      const ethereum = (window as any).ethereum;
      if (ethereum && isConnected) {
        try {
          const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
          const chainIdNumber = parseInt(chainIdHex, 16);
          setActualWalletChainId(chainIdNumber);
          console.log('Actual wallet chain ID:', chainIdNumber);
        } catch (error) {
          console.error('Error getting chain ID from wallet:', error);
          setActualWalletChainId(chainId || null);
        }
      } else {
        setActualWalletChainId(chainId || null);
      }
    };

    getWalletChainId();

    // Listen for chain changes
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      const handleChainChanged = (chainIdHex: string) => {
        const chainIdNumber = parseInt(chainIdHex, 16);
        setActualWalletChainId(chainIdNumber);
        console.log('Chain changed to:', chainIdNumber);
      };

      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isConnected, chainId]);

  // Get current network based on actual wallet chain ID
  const currentNetwork = actualWalletChainId 
    ? Object.entries(NETWORKS).find(([, network]) => network.id === actualWalletChainId)?.[1] || null
    : Object.entries(NETWORKS).find(([, network]) => network.id === chainId)?.[1] || NETWORKS.celo;
  
  const contractAddress = NETWORKS[selectedNetwork].contractAddress;

  // Read contract data
  const { data: mintFee, isLoading: isLoadingFee } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'mintFee',
    chainId: NETWORKS[selectedNetwork].id,
  });

  // Transaction state
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Submit referral to Divvi after successful transaction
  useEffect(() => {
    const submitDivviReferral = async () => {
      if (isSuccess && hash && address) {
        try {
          // Get the chain ID of the network where the transaction was sent
          const chainId = NETWORKS[selectedNetwork].id;
          
          // Submit the referral to Divvi for tracking
          await submitReferral({
            txHash: hash,
            chainId: chainId,
          });
          
          console.log('Divvi referral submitted successfully:', { txHash: hash, chainId });
        } catch (error) {
          console.error('Failed to submit Divvi referral:', error);
          // Don't show error to user as this doesn't affect the main functionality
        }
      }
    };

    submitDivviReferral();
  }, [isSuccess, hash, selectedNetwork, address]);

  // Helper functions
  const generateAIMessage = async () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const aiMessages = [
      "May this special day bring you endless joy and countless blessings that fill your heart with warmth and happiness.",
      "Wishing you a day filled with love, laughter, and all the wonderful moments that make life truly beautiful.",
      "May your path be illuminated with success, your heart filled with peace, and your days blessed with prosperity.",
      "Sending you heartfelt wishes for a day as amazing and wonderful as you are, filled with love and joy."
    ];
    setCustomMessage(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
    setIsGeneratingAI(false);
  };

  const validateRecipient = (address: string) => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    // Support various ENS domains (.eth, .xyz, .com, etc.)
    const ensRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return ethAddressRegex.test(address) || ensRegex.test(address);
  };

  const resolveEnsName = async (name: string): Promise<`0x${string}` | null> => {
    try {
      // Create a public client for ENS resolution on mainnet
      const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      // Resolve ENS name to address
      const resolvedAddress = await publicClient.getEnsAddress({
        name,
      });

      return resolvedAddress;
    } catch (error) {
      console.error('ENS resolution error:', error);
      return null;
    }
  };

  // Generate metadata URI (simplified for demo)
  useEffect(() => {
    if (selectedFestival && selectedCard && recipient) {
      const message = customMessage || selectedCard.preview;
      
      const metadata = {
        name: `${selectedFestival.name} ${selectedCard.title}`,
        description: message,
        image: `https://festify.com/cards/${selectedCard.id}.png`,
        attributes: [
          { trait_type: "Festival", value: selectedFestival.name },
          { trait_type: "Card Type", value: selectedCard.category },
          { trait_type: "Template", value: selectedCard.title },
          { trait_type: "Theme", value: selectedTheme.name },
          { trait_type: "Sender", value: address || "Unknown" },
          { trait_type: "Recipient", value: recipient }
        ]
      };
      
      // In a real app, you'd upload this to IPFS or similar
      setMetadataURI(JSON.stringify(metadata));
    }
  }, [selectedFestival, selectedCard, selectedTheme, customMessage, recipient, address]);

  // Validate recipient on change
  useEffect(() => {
    if (recipient) {
      setRecipientValid(validateRecipient(recipient));
    } else {
      setRecipientValid(null);
    }
  }, [recipient]);

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

    if (!customMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter your message or select a card template.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPending(true);
      setError(null);
      
      // Resolve ENS name if necessary
      let recipientAddress: `0x${string}` = recipient as `0x${string}`;
      const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
      
      // If it's not a hex address, assume it's an ENS name
      if (!ethAddressRegex.test(recipient)) {
        toast({
          title: "Resolving ENS Name",
          description: `Looking up address for ${recipient}...`,
        });
        
        const resolved = await resolveEnsName(recipient);
        
        if (!resolved) {
          setIsPending(false);
          toast({
            title: "ENS Resolution Failed",
            description: `Could not resolve ${recipient}. Please check the ENS name or use a wallet address instead.`,
            variant: "destructive",
          });
          return;
        }
        
        recipientAddress = resolved;
        console.log(`ENS ${recipient} resolved to ${recipientAddress}`);
      }
      
      // Get the actual current chain ID directly from the wallet provider
      const ethereum = (window as any).ethereum;
      let actualChainId: number;
      
      if (ethereum) {
        try {
          const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
          actualChainId = parseInt(chainIdHex, 16);
          console.log('Wallet chain ID:', actualChainId, 'Expected:', NETWORKS[selectedNetwork].id);
        } catch (error) {
          console.error('Error getting chain ID from wallet:', error);
          // Fallback to wagmi's chainId if wallet request fails
          actualChainId = chainId || 0;
        }
      } else {
        actualChainId = chainId || 0;
      }
      
      // Switch to selected network if needed
      if (actualChainId !== NETWORKS[selectedNetwork].id) {
        try {
          toast({
            title: "Switching Network",
            description: `Switching to ${NETWORKS[selectedNetwork].name}...`,
          });
          await switchChain({ chainId: NETWORKS[selectedNetwork].id });
          // Wait for the network switch to complete and verify
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Verify the switch was successful by checking the current chainId again
          if (ethereum) {
            const newChainIdHex = await ethereum.request({ method: 'eth_chainId' });
            const newChainIdNumber = parseInt(newChainIdHex, 16);
            console.log('After switch - Wallet chain ID:', newChainIdNumber, 'Expected:', NETWORKS[selectedNetwork].id);
            if (newChainIdNumber !== NETWORKS[selectedNetwork].id) {
              throw new Error('Network switch verification failed. Please ensure you are on the correct network.');
            }
          }
        } catch (switchError) {
          console.error('Network switch failed:', switchError);
          setIsPending(false);
          toast({
            title: "Network Switch Failed",
            description: `Please manually switch to ${NETWORKS[selectedNetwork].name} in your wallet and try again.`,
            variant: "destructive",
          });
          return;
        }
      } else {
        console.log('Wallet is already on the correct network:', NETWORKS[selectedNetwork].name);
      }

      const message = customMessage || selectedCard.preview;

      // Verify we're on the correct chain one more time before creating wallet client
      if (ethereum) {
        const finalChainIdHex = await ethereum.request({ method: 'eth_chainId' });
        const finalChainId = parseInt(finalChainIdHex, 16);
        if (finalChainId !== NETWORKS[selectedNetwork].id) {
          setIsPending(false);
          toast({
            title: "Wrong Network",
            description: `Please switch to ${NETWORKS[selectedNetwork].name} (Chain ID: ${NETWORKS[selectedNetwork].id}) in your wallet. Current chain: ${finalChainId}`,
            variant: "destructive",
          });
          return;
        }
      }

      // Create wallet client for direct transaction sending - use the selected network's chain
      // The chain must match what the wallet is actually connected to
      const walletClient = createWalletClient({
        chain: NETWORKS[selectedNetwork].chain,
        transport: custom((window as any).ethereum),
        account: address as `0x${string}`,
      });

      // Generate Divvi referral tag for tracking
      const referralTag = getReferralTag({
        user: address as `0x${string}`, // The user address making the transaction
        consumer: DIVVI_CONSUMER_ADDRESS as `0x${string}`, // Your Divvi Identifier
      });

      // Encode the contract function call
      const contractData = encodeFunctionData({
        abi: abi,
        functionName: 'mintGreetingCard',
        args: [recipientAddress, metadataURI, selectedFestival.name],
      });

      // Append the referral tag to the contract data (this is the key step!)
      const txData = contractData + referralTag;

      // Send transaction with Divvi referral tag included in data
      const txHash = await walletClient.sendTransaction({
        account: address as `0x${string}`,
        to: contractAddress as `0x${string}`,
        data: txData as `0x${string}`,
        value: (mintFee && typeof mintFee === 'bigint' ? mintFee : 0n),
        kzg: undefined,
      } as any);

      setHash(txHash);
      setIsPending(false);
    } catch (err) {
      console.error('Error minting card:', err);
      setIsPending(false);
      setError(err as Error);
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
      // Avalanche uses a different URL format
      if (selectedNetwork === 'avalanche') {
        return `https://avascan.info/blockchain/c/tx/${hash}`;
      }
      return `${network.chain.blockExplorers.default.url}/tx/${hash}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 via-transparent to-accent/3 rounded-full blur-3xl" />
      </div>
      
      <SEOHead 
        title="Create Premium Greeting Card - Festify"
        description="Design and mint personalized NFT greeting cards for any festival. Choose from 25+ premium themes, customize your message, and send across multiple blockchains."
        url="https://www.festify.club/create"
      />
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Premium Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20 px-6 py-3 backdrop-blur-sm">
                <Gift className="h-4 w-4 mr-2" />
                Premium Card Creator
              </Badge>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient-hero leading-tight">
              Create Your
              <span className="block text-gradient-festive">Perfect Greeting</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our premium collection of greeting cards or create a free one. 
              Customize your message and send memorable digital cards across multiple blockchains.
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step ? 'bg-gradient-to-r from-primary to-accent' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Card Type Selection */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Choose Card Type</h3>
                    <p className="text-muted-foreground">Select between free or premium NFT cards</p>
                  </div>
                </div>

                {/* Card Type Toggle */}
                <div className="flex bg-muted/30 rounded-2xl p-2 mb-8">
                  <button
                    onClick={() => {
                      setCardType('free');
                      setSelectedCard(freeCards[0]);
                      setCurrentStep(1);
                    }}
                    className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all duration-300 ${
                      cardType === 'free'
                        ? 'bg-white shadow-lg text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Gift className="h-5 w-5" />
                    <span className="font-semibold">Free Cards</span>
                  </button>
                  <button
                    onClick={() => {
                      setCardType('premium');
                      setSelectedCard(premiumCards[0]);
                      setCurrentStep(1);
                    }}
                    className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all duration-300 ${
                      cardType === 'premium'
                        ? 'bg-white shadow-lg text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Crown className="h-5 w-5" />
                    <span className="font-semibold">Premium NFT Cards</span>
                  </button>
                </div>

                {/* Card Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(cardType === 'free' ? freeCards : premiumCards).map((card) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        setSelectedCard(card);
                        setCurrentStep(2);
                      }}
                      className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedCard.id === card.id
                          ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl'
                          : 'border-slate-200 hover:border-primary/50 bg-white/50'
                      }`}
                    >
                      {/* Card Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 rounded-2xl`} />
                      
                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{card.emoji}</div>
                            <div>
                              <h4 className="font-bold text-lg text-foreground">{card.title}</h4>
                              <p className="text-sm text-muted-foreground">{card.category}</p>
                            </div>
                          </div>
                          {selectedCard.id === card.id && (
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {card.preview}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {card.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{card.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Festival Selection */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Choose Festival Theme</h3>
                    <p className="text-muted-foreground">Select the occasion for your greeting card</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {festivals.map((festival) => (
                    <button
                      key={festival.id}
                      onClick={() => setSelectedFestival(festival)}
                      className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        selectedFestival.id === festival.id
                          ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg'
                          : 'border-slate-200 hover:border-primary/50 bg-white/50'
                      }`}
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{festival.emoji}</div>
                      <div className="text-sm font-semibold text-foreground">{festival.name}</div>
                      {selectedFestival.id === festival.id && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Custom Message Section */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Customize Your Message</h3>
                    <p className="text-muted-foreground">Write a heartfelt message or use AI assistance</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write your heartfelt message here..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-32 text-lg border-2 border-slate-200 focus:border-primary/50 transition-all duration-200 rounded-2xl"
                    maxLength={500}
                  />
                  
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={generateAIMessage}
                      disabled={isGeneratingAI}
                      variant="outline"
                      className="flex items-center space-x-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                    >
                      {isGeneratingAI ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                      <span>{isGeneratingAI ? 'Generating...' : 'Generate with AI'}</span>
                    </Button>
                    
                    <div className="text-sm font-medium text-muted-foreground">
                      {customMessage.length}/500 characters
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recipient Input */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Recipient Address</h3>
                    <p className="text-muted-foreground">Who will receive your greeting card?</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="0x... or ENS name (e.g., alice.eth)"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="h-14 text-lg border-2 border-slate-200 focus:border-primary/50 transition-all duration-200 rounded-2xl pr-12"
                    />
                    {recipient && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {recipientValid === true ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : recipientValid === false ? (
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Enter wallet address or ENS name — recipient will collect the NFT card</span>
                    </div>
                    {recipient && !recipient.startsWith('0x') && recipientValid && (
                      <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <Globe className="h-4 w-4" />
                        <span>ENS name detected: {recipient} will be resolved to an Ethereum address</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Network Selection */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Select Network</h3>
                    <p className="text-muted-foreground">Choose your preferred blockchain</p>
                  </div>
                </div>
                
                <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
                  <SelectTrigger className="w-full h-14 text-lg border-2 border-slate-200 hover:border-primary/50 transition-all duration-200 rounded-2xl">
                    <SelectValue placeholder="Choose a network" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-slate-200 shadow-xl rounded-2xl">
                    {Object.entries(NETWORKS).map(([key, network]) => (
                      <SelectItem key={key} value={key} className="h-12">
                        <div className="flex items-center space-x-3">
                          <div className={`network-indicator ${network.color} w-4 h-4 rounded-full`} />
                          <span className="font-medium">{network.name}</span>
                          <span className="text-muted-foreground">({network.currency})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-6 p-6 bg-gradient-to-r from-muted/30 to-muted/20 rounded-2xl border border-slate-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Contract Address:</span>
                      <code className="text-sm bg-background/80 px-3 py-1 rounded-lg border border-slate-200">
                        {formatAddress(contractAddress)}
                      </code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Mint Fee:</span>
                      <span className="font-mono text-sm">
                        {isLoadingFee ? (
                          <span className="text-muted-foreground">Loading...</span>
                        ) : mintFee && typeof mintFee === 'bigint' ? (
                          `${formatEther(mintFee)} ${NETWORKS[selectedNetwork].currency}`
                        ) : (
                          <span className="text-success font-semibold">Free</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Design Theme Selector */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Choose Design Theme</h3>
                    <p className="text-muted-foreground">Customize the color scheme of your card</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {designThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        selectedTheme.id === theme.id
                          ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg'
                          : 'border-slate-200 hover:border-primary/50 bg-white/50'
                      }`}
                    >
                      {/* Theme Preview */}
                      <div className={`w-full h-16 rounded-xl ${theme.color} mb-3 shadow-lg`} />
                      
                      <div className="text-center">
                        <div className="text-2xl mb-1">{theme.emoji}</div>
                        <div className="text-sm font-semibold text-foreground">{theme.name}</div>
                        <div className="text-xs text-muted-foreground">{theme.description}</div>
                      </div>
                      
                      {selectedTheme.id === theme.id && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Enhanced Card Preview */}
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Live Card Preview</h3>
                    <p className="text-muted-foreground">See exactly how your greeting card will look</p>
                  </div>
                </div>
                
                {/* Card Preview Container */}
                <div className="relative group">
                  {/* Preview Card */}
                  <div className={`relative overflow-hidden bg-gradient-to-br ${selectedTheme.gradient} border-2 border-white/30 shadow-2xl rounded-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl`}>
                    {/* Animated Background Effects */}
                    <div className="absolute inset-0">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    
                    {/* Card Content */}
                    <div className="relative p-8 min-h-[400px] flex flex-col justify-between">
                      {/* Header Section */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-bold backdrop-blur-sm border border-white/30 shadow-lg">
                            <span className="text-lg mr-2">{selectedCard.emoji}</span>
                            {selectedCard.title}
                          </Badge>
                          {selectedCard.category === 'Premium NFT' && (
                            <Crown className="h-5 w-5 text-yellow-300 drop-shadow-lg" />
                          )}
                        </div>
                        <div className="flex space-x-1">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className="h-4 w-4 fill-white/90 text-white/90 drop-shadow-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          ))}
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
                        {/* Festival Icon */}
                        <div className="relative">
                          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
                            <span className="text-4xl">{selectedFestival.emoji}</span>
                          </div>
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                        </div>
                        
                        {/* Festival Title */}
                        <div className="space-y-2">
                          <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                            {selectedFestival.name} Greetings!
                          </h3>
                          <div className="w-16 h-1 bg-white/60 mx-auto rounded-full" />
                        </div>
                        
                        {/* Custom Message */}
                        <div className="max-w-md mx-auto">
                          <p className="text-white/95 text-lg leading-relaxed font-medium drop-shadow-sm">
                            {customMessage || selectedCard.preview}
                          </p>
                        </div>
                      </div>
                      
                      {/* Footer Section */}
                      <div className="mt-8">
                        <div className="flex items-center justify-between text-sm text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
                            <span className="font-semibold">From: {address ? formatAddress(address) : 'your.wallet'}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse shadow-lg" />
                            <span className="font-semibold">To: {recipient ? formatAddress(recipient) : 'recipient.wallet'}</span>
                          </div>
                        </div>
                        
                        {/* Card Type Badge */}
                        <div className="mt-4 flex justify-center">
                          <Badge className={`px-4 py-2 text-xs font-bold ${
                            selectedCard.category === 'Premium NFT' 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                              : 'bg-white/20 text-white backdrop-blur-sm'
                          }`}>
                            {selectedCard.category === 'Premium NFT' ? (
                              <>
                                <Crown className="h-3 w-3 mr-1" />
                                Premium NFT Card
                              </>
                            ) : (
                              <>
                                <Gift className="h-3 w-3 mr-1" />
                                Free Greeting Card
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Overlay Info */}
                  <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-slate-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <Eye className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Preview Info */}
                <div className="mt-6 p-4 bg-muted/30 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-muted-foreground">Live Preview</span>
                    </div>
                    <div className="text-muted-foreground">
                      {selectedCard.category} • {selectedCard.price} • {selectedTheme.name}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status Messages */}
            {isConnected && actualWalletChainId !== null && actualWalletChainId !== NETWORKS[selectedNetwork].id && (
              <Alert className="border-orange-200 bg-orange-50" variant="default">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  You're connected to {currentNetwork?.name || `Chain ${actualWalletChainId}`}, but need to be on {NETWORKS[selectedNetwork].name}. 
                  The app will automatically switch networks when you mint.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="border-red-200 bg-red-50" variant="destructive">
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
              <Alert className="border-green-200 bg-green-50" variant="default">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
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
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="space-y-6">
                  {isConnected ? (
                    <>
                      <Button 
                        onClick={() => {
                          setCurrentStep(3);
                          handleMint();
                        }}
                        disabled={isPending || isConfirming || !recipient || !customMessage.trim()}
                        className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary-hover text-white shadow-2xl hover:shadow-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-2xl"
                      >
                        {isPending || isConfirming ? (
                          <>
                            <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                            {isPending ? 'Confirming Transaction...' : 'Minting Your Card...'}
                          </>
                        ) : (
                          <>
                            <Send className="h-6 w-6 mr-3" />
                            {cardType === 'premium' ? 'Mint & Send Premium Card' : 'Send Free Greeting Card'}
                            <ArrowRight className="h-5 w-5 ml-3" />
                          </>
                        )}
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-muted/30 rounded-2xl">
                          <div className="text-sm font-medium text-muted-foreground mb-1">Network</div>
                          <div className="text-primary font-semibold">{NETWORKS[selectedNetwork].name}</div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-2xl">
                          <div className="text-sm font-medium text-muted-foreground mb-1">Fee</div>
                          <div className="text-primary font-semibold">
                            {isLoadingFee ? 'Loading...' : mintFee && typeof mintFee === 'bigint' ? `${formatEther(mintFee)} ${NETWORKS[selectedNetwork].currency}` : 'Free'}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button disabled className="w-full h-16 text-xl font-bold bg-gradient-to-r from-muted to-muted/80 text-muted-foreground cursor-not-allowed rounded-2xl">
                        <Wallet className="h-6 w-6 mr-3" />
                        Connect Wallet to Continue
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        Please connect your wallet using the header button to start creating your greeting card
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
