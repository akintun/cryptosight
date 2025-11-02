import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  balance: number;
  price: number;
  change24h: number;
  value: number;
  allocation: number;
  transactions: {
    type: string;
    amount: string;
    date: string;
  }[];
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "₿",
    balance: 2.5,
    price: 98234,
    change24h: 3.24,
    value: 245585,
    allocation: 52.3,
    transactions: [
      { type: "Received", amount: "0.5 BTC", date: "Oct 28, 2025" },
      { type: "Sent", amount: "0.2 BTC", date: "Oct 25, 2025" },
      { type: "Swap", amount: "1.0 BTC from ETH", date: "Oct 20, 2025" },
    ],
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    logo: "Ξ",
    balance: 45.8,
    price: 3678,
    change24h: -1.45,
    value: 168452,
    allocation: 35.8,
    transactions: [
      { type: "Swap", amount: "5.0 ETH for USDC", date: "Oct 29, 2025" },
      { type: "Received", amount: "10.0 ETH", date: "Oct 22, 2025" },
      { type: "Staked", amount: "32.0 ETH", date: "Oct 15, 2025" },
    ],
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    logo: "◎",
    balance: 850,
    price: 32.45,
    change24h: 5.67,
    value: 27582,
    allocation: 5.9,
    transactions: [
      { type: "Purchased", amount: "200 SOL", date: "Oct 30, 2025" },
      { type: "Staked", amount: "500 SOL", date: "Oct 18, 2025" },
      { type: "Received", amount: "150 SOL", date: "Oct 12, 2025" },
    ],
  },
  {
    id: "4",
    name: "USD Coin",
    symbol: "USDC",
    logo: "$",
    balance: 28000,
    price: 1.0,
    change24h: 0.01,
    value: 28000,
    allocation: 6.0,
    transactions: [
      { type: "Swap", amount: "5,000 USDC from ETH", date: "Oct 29, 2025" },
      { type: "Deposited", amount: "20,000 USDC", date: "Oct 24, 2025" },
      { type: "Earned", amount: "3,000 USDC yield", date: "Oct 21, 2025" },
    ],
  },
];

export default function Portfolio() {
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null);
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);

  const toggleExpand = (assetId: string) => {
    setExpandedAsset(expandedAsset === assetId ? null : assetId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
            <p className="text-muted-foreground">
              Track and manage your crypto assets
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="mr-2" />
              Refresh Data
            </Button>
            <Button variant="default">
              <Plus className="mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        <Card className="p-6 shadow-elegant card-gradient">
          <div className="text-sm text-muted-foreground mb-1">
            Total Portfolio Value
          </div>
          <div className="text-5xl font-bold text-gradient">
            ${totalValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="default" className="bg-success text-success-foreground">
              +12.4%
            </Badge>
            <span className="text-sm text-muted-foreground">Last 24h</span>
          </div>
        </Card>
      </div>

      {/* Asset Table */}
      <Card className="overflow-hidden shadow-elegant">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12"></TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Allocation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAssets.map((asset) => (
              <>
                <TableRow
                  key={asset.id}
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => toggleExpand(asset.id)}
                >
                  <TableCell>
                    {expandedAsset === asset.id ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold">
                        {asset.logo}
                      </div>
                      <div>
                        <div className="font-semibold">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {asset.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {asset.balance.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={asset.change24h >= 0 ? "default" : "destructive"}
                      className={
                        asset.change24h >= 0
                          ? "bg-success text-success-foreground"
                          : ""
                      }
                    >
                      {asset.change24h > 0 ? "+" : ""}
                      {asset.change24h}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${asset.value.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${asset.allocation}%` }}
                        />
                      </div>
                      <span className="text-sm">{asset.allocation}%</span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Row */}
                {expandedAsset === asset.id && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-muted/20 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Chart Placeholder */}
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            Price Chart
                            <Badge variant="outline">Coming Soon</Badge>
                          </h3>
                          <div className="h-48 bg-card rounded-lg border border-border flex items-center justify-center text-muted-foreground">
                            Interactive chart will be displayed here
                          </div>
                        </div>

                        {/* Recent Transactions */}
                        <div>
                          <h3 className="font-semibold mb-4">
                            Recent Transactions
                          </h3>
                          <div className="space-y-3">
                            {asset.transactions.map((tx, idx) => (
                              <div
                                key={idx}
                                className="p-3 bg-card rounded-lg border border-border"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-sm">
                                      {tx.type}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {tx.date}
                                    </div>
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {tx.amount}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
