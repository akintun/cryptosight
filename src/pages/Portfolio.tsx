import { useEffect, useState } from "react";
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
  // ... (mock data remains the same)
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

export default function Portfolio() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // To test error state, uncomment the next line
      // setError("Failed to connect to the data source. Please try again later.");
      setAssets(mockAssets);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const toggleExpand = (assetId: string) => {
    setExpandedAsset(expandedAsset === assetId ? null : assetId);
  };

  const handleRefresh = () => {
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
          {loading ? (
            <Skeleton className="h-12 w-64 mt-1" />
          ) : (
            <div className="text-5xl font-bold text-gradient">
              ${totalValue.toLocaleString()}
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
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-16 ml-auto rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-28 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
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
                    {/* ... TableCells remain the same */}
                  </TableRow>

                  {/* Expanded Row */}
                  {expandedAsset === asset.id && (
                    <TableRow>
                      {/* ... Expanded content remains the same */}
                    </TableRow>
                  )}
                </>
              ))
            ) : (
              !error && (
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
