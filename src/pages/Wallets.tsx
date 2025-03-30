
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, Shield, ArrowRight, Link, Smartphone, Scan, 
  CircleCheck, AlertCircle, HelpCircle
} from 'lucide-react';

// UPI provider data
const upiProviders = [
  { 
    id: 'gpay',
    name: 'Google Pay',
    logo: '🟦',
    color: 'text-blue-500'
  },
  { 
    id: 'phonepe',
    name: 'PhonePe',
    logo: '🟪',
    color: 'text-purple-500'
  },
  { 
    id: 'paytm',
    name: 'Paytm',
    logo: '⬜',
    color: 'text-blue-400'
  },
  { 
    id: 'amazonpay',
    name: 'Amazon Pay',
    logo: '🟧',
    color: 'text-orange-500'
  },
  { 
    id: 'whatsapp',
    name: 'WhatsApp Pay',
    logo: '🟩',
    color: 'text-green-500'
  },
];

const Wallets = () => {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = React.useState('');
  
  const handleConnect = () => {
    toast({
      title: "Coming Soon",
      description: "UPI wallet integration is currently under development.",
    });
  };
  
  const handleConnectTab = () => {
    // Find the connect tab button and click it
    const connectTab = document.querySelector('[value="connect"]');
    if (connectTab && 'click' in connectTab) {
      (connectTab as HTMLElement).click();
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold">Wallet Integration</h1>
        <p className="text-muted-foreground">Connect your UPI wallets to automatically track transactions</p>
      </div>
      
      <Tabs defaultValue="connect" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px] mb-4">
          <TabsTrigger value="connect">Connect</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connect" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect UPI Wallet</CardTitle>
              <CardDescription>
                Link your UPI wallets to automatically import transaction data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {upiProviders.map(provider => (
                  <div
                    key={provider.id}
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                      selectedProvider === provider.id 
                        ? 'ring-2 ring-primary' 
                        : ''
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="text-3xl mb-2">{provider.logo}</div>
                    <div className={`font-medium text-sm ${provider.color}`}>
                      {provider.name}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                <div className="text-center">
                  <HelpCircle className="mx-auto mb-2 text-muted-foreground" />
                  <h3 className="font-medium">How It Works</h3>
                  <p className="text-sm text-muted-foreground">
                    We use secure read-only access to fetch your transaction history. We never store your login credentials.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3">
                    <Scan className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <p className="text-sm">Authorize with QR code or SMS</p>
                  </div>
                  <div className="p-3">
                    <Shield className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <p className="text-sm">Read-only access to transactions</p>
                  </div>
                  <div className="p-3">
                    <CircleCheck className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <p className="text-sm">Auto-categorized expenses</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleConnect}
                disabled={!selectedProvider}
                className="gap-1"
              >
                Connect
                <ArrowRight size={16} />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Manual Connection</CardTitle>
              <CardDescription>
                If automatic connection doesn't work, you can authorize manually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter UPI registered number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID (Optional)</Label>
                    <Input id="upi-id" placeholder="yourname@upi" />
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-md bg-amber-50 dark:bg-amber-900/20">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                  <p className="text-sm text-muted-foreground">
                    We'll send you a verification code to authorize access to your UPI transactions.
                  </p>
                </div>
                
                <Button variant="outline" className="w-full" onClick={handleConnect}>
                  Send Verification Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Wallets</CardTitle>
              <CardDescription>
                Manage your connected UPI wallets and payment services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <Wallet className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                <h3 className="font-medium text-lg mb-1">No Wallets Connected</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your UPI wallets to automatically track transactions
                </p>
                <Button onClick={handleConnectTab}>
                  Connect Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
              <CardDescription>
                Learn about how we protect your data and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    Data Encryption
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All your financial data is encrypted with bank-level security. We use AES-256 encryption for all stored data.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Link className="mr-2 h-5 w-5 text-primary" />
                    Read-Only Access
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We only request read-only access to your transactions. We cannot make payments or transfer funds on your behalf.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Smartphone className="mr-2 h-5 w-5 text-primary" />
                    Credential Storage
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We never store your UPI PIN, passwords, or any other login credentials. Authentication is handled via secure tokens.
                  </p>
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground pt-4">
                For more information, please review our <span className="text-primary cursor-pointer">Privacy Policy</span> and <span className="text-primary cursor-pointer">Terms of Service</span>.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallets;
