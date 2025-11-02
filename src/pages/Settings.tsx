import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { toast } from "sonner";

const mockNFTBadges = [
  { id: "1", name: "Early Adopter", image: "🏆" },
  { id: "2", name: "100 Entries", image: "📚" },
  { id: "3", name: "Whale Spotter", image: "🐋" },
  { id: "4", name: "Agent Master", image: "🤖" },
];

const mockConnections = [
  { id: "1", name: "MetaMask", address: "0x742d...4f8c", status: "connected" },
  { id: "2", name: "Coinbase API", address: "api-key-ending-in...gH4s", status: "connected" },
  { id: "3", name: "WalletConnect", address: "Not connected", status: "disconnected" },
];

const mockInvoices = [
  { id: "1", date: "Oct 1, 2025", amount: "$49.00", plan: "Premium" },
  { id: "2", date: "Sep 1, 2025", amount: "$49.00", plan: "Premium" },
  { id: "3", date: "Aug 1, 2025", amount: "$49.00", plan: "Premium" },
];

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [agentTriggers, setAgentTriggers] = useState(true);

  const handleSaveChanges = () => {
    toast.success("Profile information has been updated!");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto gap-2">
          <TabsTrigger value="profile">
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing">
            Billing
          </TabsTrigger>
          <TabsTrigger value="connections">
            Connections
          </TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="badges">
            NFT Badges
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="p-6 shadow-elegant">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    defaultValue="John Doe"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    defaultValue="john@example.com"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
            <Button className="mt-6" size="lg" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <Card className="p-6 shadow-elegant card-gradient">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Current Plan</h2>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">
                      Premium
                    </Badge>
                    <span className="text-xl font-semibold">$49/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Next billing date: November 1, 2025
                  </p>
                </div>
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  Manage Subscription
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-elegant">
              <h2 className="text-2xl font-bold mb-4">Invoice History</h2>
              <div className="space-y-3">
                {mockInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold">{invoice.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {invoice.plan} Plan
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{invoice.amount}</span>
                      <Button variant="ghost" size="icon" aria-label={`Download invoice for ${invoice.date}`}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Connections Tab */}
        <TabsContent value="connections">
          <Card className="p-6 shadow-elegant">
            <h2 className="text-2xl font-bold mb-6">Connected Wallets & Exchanges</h2>
            <div className="space-y-4">
              {mockConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-muted/30 rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold flex-shrink-0">
                      {connection.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{connection.name}</div>
                      <div className="text-sm text-muted-foreground break-all">
                        {connection.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Badge
                      variant={
                        connection.status === "connected" ? "default" : "outline"
                      }
                      className={`w-24 justify-center ${
                        connection.status === "connected"
                          ? "bg-success text-success-foreground"
                          : ""
                      }`}
                    >
                      {connection.status === "connected"
                        ? "Connected"
                        : "Not Connected"}
                    </Badge>
                    {connection.status === "connected" ? (
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        Revoke Access
                      </Button>
                    ) : (
                      <Button variant="default" size="sm" className="w-full md:w-auto">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-6 shadow-elegant">
            <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-journal" className="font-medium cursor-pointer">Daily Journal Summary</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily AI insights in your inbox
                      </p>
                    </div>
                    <Switch id="daily-journal" checked={emailNotif} onCheckedChange={setEmailNotif} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                       <Label htmlFor="price-alerts" className="font-medium cursor-pointer">Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when price targets are hit
                      </p>
                    </div>
                    <Switch id="price-alerts" checked={priceAlerts} onCheckedChange={setPriceAlerts} />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">SMS Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                       <Label htmlFor="critical-alerts" className="font-medium cursor-pointer">Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        SMS for urgent notifications only
                      </p>
                    </div>
                    <Switch id="critical-alerts" checked={smsNotif} onCheckedChange={setSmsNotif} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                       <Label htmlFor="agent-triggers" className="font-medium cursor-pointer">Agent Triggers</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when agents execute actions
                      </p>
                    </div>
                    <Switch
                      id="agent-triggers"
                      checked={agentTriggers}
                      onCheckedChange={setAgentTriggers}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* NFT Badges Tab */}
        <TabsContent value="badges">
          <Card className="p-6 shadow-elegant">
            <h2 className="text-2xl font-bold mb-6">Earned NFT Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockNFTBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 text-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-6xl mb-3">{badge.image}</div>
                  <div className="font-semibold">{badge.name}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
