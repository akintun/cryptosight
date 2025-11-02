import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
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
  {
    id: "4",
    agentName: "BTC Price Alert",
    timestamp: "Oct 31, 2025 16:30",
    outcome: "SMS sent successfully to +1-XXX-XXX-5678",
  },
];

export default function Agents() {
  const [agents, setAgents] = useState(mockAgents);

  const toggleAgent = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === "active" ? "inactive" : "active",
            }
          : agent
      )
    );
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
          <Button variant="default" size="lg">
            <Plus className="mr-2" />
            Create New Agent
          </Button>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="p-5 shadow-elegant hover:shadow-glow transition-shadow duration-300"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <Badge
                variant={agent.status === "active" ? "default" : "outline"}
                className={
                  agent.status === "active"
                    ? "bg-success text-success-foreground"
                    : ""
                }
              >
                {agent.status === "active" ? "🟢 Active" : "⚫ Inactive"}
              </Badge>
            </div>

            {/* Card Body */}
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Condition
                </div>
                <div className="text-sm font-medium">{agent.condition}</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Action</div>
                <div className="text-sm font-medium">{agent.action}</div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Switch
                  checked={agent.status === "active"}
                  onCheckedChange={() => toggleAgent(agent.id)}
                />
                <span className="text-sm text-muted-foreground">
                  {agent.status === "active" ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
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
              {mockHistory.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    {record.agentName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.timestamp}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{record.outcome}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
