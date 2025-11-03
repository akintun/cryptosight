import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import {
  Plus,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// --- Data Structures and Mock API ---

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
];

// This function simulates fetching data from a backend API.
// In a real application, this would use `fetch` or `axios`.
const fetchPortfolioAssets = async (): Promise<Asset[]> => {
  console.log("Fetching latest portfolio data...");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // To test error state, uncomment the following line:
  // if (Math.random() > 0.5) throw new Error("Failed to connect to the data source.");

  // Simulate price fluctuations for live data effect
  return mockAssets.map(asset => ({
    ...asset,
    price: asset.price * (1 + (Math.random() - 0.5) * 0.05), // Fluctuate by +/- 5%
  }));
};

// --- Component ---

export default function Portfolio() {
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null);

  const {
    data: assets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Asset[], Error>({
    queryKey: ['portfolioAssets'],
    queryFn: fetchPortfolioAssets,
    refetchInterval: 30000, // Automatically refetch every 30 seconds
  });

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const toggleExpand = (assetId: string) => {
    setExpandedAsset(expandedAsset === assetId ? null : assetId);
  };

  const handleRefresh = () => {
    refetch(); // Manually trigger a refetch
    toast.success("Portfolio data has been refreshed!");
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
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="mr-2" />
              Refresh Data
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Transaction</DialogTitle>
                  <DialogDescription>
                    Manually add a transaction to your portfolio.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset" className="text-right">Asset</Label>
                    <Input id="asset" placeholder="e.g., Bitcoin" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Amount</Label>
                    <Input id="amount" type="number" placeholder="0.5" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Transaction</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="p-6 shadow-elegant card-gradient">
          <div className="text-sm text-muted-foreground mb-1">
            Total Portfolio Value
          </div>
          {isLoading ? (
            <Skeleton className="h-12 w-64 mt-1" />
          ) : (
            <div className="text-5xl font-bold text-gradient">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          )}
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
        {isError && (
          <Alert variant="destructive" className="m-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Data</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
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
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-6 w-16 ml-auto rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-28 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : assets.length > 0 ? (
              assets.map((asset) => (
                <>
                  <TableRow
                    key={asset.id}
                    className="cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggleExpand(asset.id)}
                  >
                    <TableCell>
                      {expandedAsset === asset.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                          {asset.logo}
                        </div>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">{asset.balance.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">${asset.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={asset.change24h >= 0 ? "default" : "destructive"} className={asset.change24h >= 0 ? "bg-success text-success-foreground" : ""}>
                        {asset.change24h.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">${asset.value.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">{asset.allocation.toFixed(2)}%</TableCell>
                  </TableRow>

                  {/* Expanded Row for Transactions */}
                  {expandedAsset === asset.id && (
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableCell colSpan={7} className="p-0">
                        <div className="p-4">
                          <h4 className="font-semibold text-md mb-2">Recent Transactions</h4>
                          <ul className="space-y-2">
                            {asset.transactions.map((tx, index) => (
                              <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md bg-background">
                                <span className="text-muted-foreground">{tx.date}</span>
                                <span className="font-medium">{tx.type}</span>
                                <span>{tx.amount}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            ) : (
              !isError && (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      Your portfolio is empty
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Add a transaction to start tracking your assets.
                    </p>
                    <Button>
                      <Plus className="mr-2" />
                      Add First Transaction
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
