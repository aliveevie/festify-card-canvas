import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Gift, 
  Heart, 
  Star, 
  Sparkles,
  Send,
  Calendar,
  Users,
  ChevronRight
} from "lucide-react";

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

export const CreateCardSection = () => {
  const [selectedFestival, setSelectedFestival] = useState(festivals[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [customMessage, setCustomMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-2">
            <Gift className="h-4 w-4 mr-2" />
            Create Your Card
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-hero">
            Design Your Perfect Greeting
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from 25 festival themes, customize your message, and send memorable 
            NFT greeting cards to your loved ones.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Creation Form */}
          <div className="space-y-8">
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
                  <span>From: your.wallet</span>
                  <span>To: {recipient || 'recipient.wallet'}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <Button className="btn-hero w-full text-lg py-4">
                <Send className="h-5 w-5 mr-2" />
                Mint & Send Card
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Estimated fee: ~$0.50 USD
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};