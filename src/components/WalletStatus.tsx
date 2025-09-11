import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { 
  Wallet, 
  TrendingUp, 
  Activity,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WalletStatus = () => {
  const { 
    address, 
    isConnected, 
    balance, 
    currentNetwork, 
    connect, 
    formatAddress, 
    formatBalance 
  } = useWallet();
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openExplorer = () => {
    if (address && currentNetwork?.chain.blockExplorers?.default) {
      window.open(`${currentNetwork.chain.blockExplorers.default.url}/address/${address}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <Card className="card-elevated p-6">
        <div className="text-center space-y-4">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
            <p className="text-muted-foreground text-sm">
              Connect your wallet to start creating and sending greeting card NFTs
            </p>
          </div>
          <Button onClick={connect} className="btn-hero">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Wallet Info */}
      <Card className="card-elevated p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Wallet Connected</h3>
            <Badge className="bg-success/10 text-success border-success/20">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address:</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{formatAddress(address)}</span>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={openExplorer}>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {currentNetwork && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network:</span>
                <div className="flex items-center space-x-2">
                  <div className={`network-indicator ${currentNetwork.color} w-3 h-3`} />
                  <span className="text-sm">{currentNetwork.name}</span>
                </div>
              </div>
            )}
            
            {balance && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Balance:</span>
                <span className="text-sm font-medium">{formatBalance(balance)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="card-elevated p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Cards Sent</span>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </Card>
        
        <Card className="card-elevated p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Cards Received</span>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </Card>
      </div>
    </div>
  );
};