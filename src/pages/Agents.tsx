import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Agent {
  id: string;
  name: string;
  condition: string;
  action: string;
  status: "active" | "inactive";
}

interface TriggerHistory {
  id: string;
  agentName: string;
  timestamp: string;
  outcome: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "BTC Price Alert",
    condition: "IF BTC Price > $100,000",
    action: "THEN Send SMS Alert",
    status: "active",
  },
  {
    id: "2",
    name: "ETH Gas Monitor",
    condition: "IF ETH Gas < 15 Gwei",
    action: "THEN Execute DeFi Transaction",
    status: "active",
  },
  {
    id: "3",
    name: "Portfolio Rebalance",
    condition: "IF BTC Allocation > 60%",
    action: "THEN Swap to Stablecoins",
    status: "inactive",
  },
  {
    id: "4",
    name: "Whale Activity",
    condition: "IF Whale Transfer > 1000 BTC",
    action: "THEN Send Email Notification",
    status: "active",
  },
];

const mockHistory: TriggerHistory[] = [
  {
    id: "1",
    agentName: "BTC Price Alert",
    timestamp: "Nov 1, 2025 14:23",
    outcome: "SMS sent successfully to +1-XXX-XXX-5678",
  },
  {
    id: "2",
    agentName: "ETH Gas Monitor",
    timestamp: "Nov 1, 2025 09:15",
    outcome: "Transaction executed: 0x7f3a...2b9c",
  },
  {
    id: "3",
    agentName: "Whale Activity",
    timestamp: "Oct 31, 2025 22:47",
    outcome: "Email notification sent to user@example.com",
  },
];

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [history, setHistory] = useState<TriggerHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setAgents(mockAgents);
      setHistory(mockHistory);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleAgent = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === "active" ? "inactive" : "active",
            }
          : agent,
      ),
    );
  };

  const deleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
    toast.success("Agent deleted successfully!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">On-Chain Agents</h1>
            <p className="text-muted-foreground">
              Automate your crypto strategies with smart triggers
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="lg">
                <Plus className="mr-2" />
                Create New Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Agent</DialogTitle>
                <DialogDescription>
                  Set up a new condition and action to automate your tasks.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="e.g., BTC Price Alert" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="condition" className="text-right">
                    Condition
                  </Label>
                  <Input id="condition" placeholder="IF BTC Price > $100,000" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="action" className="text-right">
                    Action
                  </Label>
                  <Input id="action" placeholder="THEN Send SMS Alert" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Agent</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <Skeleton className="h-6 w-3/5" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <div className="space-y-3 mb-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <Skeleton className="h-6 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </Card>
          ))
        ) : agents.length > 0 ? (
          agents.map((agent) => (
            <Card
              key={agent.id}
              className="p-5 shadow-elegant hover:shadow-glow transition-shadow duration-300"
            >
              <CardHeader className="p-0 mb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <Badge
                    variant={agent.status === "active" ? "default" : "outline"}
                    className={
                      agent.status === "active" ? "bg-success text-success-foreground" : ""
                    }
                  >
                    {agent.status === "active" ? "🟢 Active" : "⚫ Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-3 mb-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Condition</div>
                  <div className="text-sm font-medium">{agent.condition}</div>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-xs text-muted-foreground mb-1">Action</div>
                  <div className="text-sm font-medium">{agent.action}</div>
                </div>
              </CardContent>
              <CardFooter className="p-0 flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={agent.status === "active"}
                    onCheckedChange={() => toggleAgent(agent.id)}
                    aria-label={`Toggle agent ${agent.name}`}
                  />
                  <span className="text-sm text-muted-foreground">
                    {agent.status === "active" ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" aria-label="Edit Agent">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Delete Agent">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your agent
                          "{agent.name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteAgent(agent.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No Agents Found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first on-chain agent.
            </p>
            <Button>
              <Plus className="mr-2" />
              Create Agent
            </Button>
          </Card>
        )}
      </div>

      {/* Trigger History */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trigger History</h2>
        <Card className="overflow-hidden shadow-elegant">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Agent Name</TableHead>
                <TableHead>Date/Time Triggered</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : history.length > 0 ? (
                history.map((record) => (
                  <TableRow key={record.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{record.agentName}</TableCell>
                    <TableCell className="text-muted-foreground">{record.timestamp}</TableCell>
                    <TableCell>
                      <span className="text-sm">{record.outcome}</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    No trigger history yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
