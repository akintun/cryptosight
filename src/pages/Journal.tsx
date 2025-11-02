import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JournalEntry {
  id: string;
  date: string;
  headline: string;
  content: string;
  dataPoints: {
    title: string;
    value: string;
    change?: number;
  }[];
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: "November 1, 2025",
    headline: "Bitcoin Shows Strong Bullish Momentum Amid Institutional Interest",
    content: `Today's on-chain analysis reveals significant bullish momentum for **Bitcoin ($BTC)**, driven primarily by increased institutional accumulation and positive social sentiment. The convergence of multiple technical indicators suggests a potential breakout above the $105,000 resistance level.

Key observations from today's data show that whale addresses (holding >1,000 BTC) have increased their holdings by 2.3% in the past 24 hours, indicating strong confidence from major players. Additionally, exchange outflows have reached their highest level in three weeks, suggesting investors are moving assets to cold storage for long-term holding.

The social sentiment analysis across major crypto communities shows overwhelmingly positive discussions around Bitcoin, with sentiment scores reaching 78/100. This aligns with the technical picture and reinforces the bullish thesis.`,
    dataPoints: [
      { title: "Social Sentiment Score", value: "78/100", change: 12 },
      { title: "On-Chain Volume (24h)", value: "$48.2B", change: 23 },
      { title: "Whale Activity", value: "+2.3%", change: 2.3 },
      { title: "Exchange Outflow", value: "12,500 BTC", change: 45 },
    ],
  },
  {
    id: "2",
    date: "October 31, 2025",
    headline: "Ethereum Layer-2 Activity Surges as Gas Fees Decline",
    content: `Ethereum's Layer-2 ecosystem is experiencing unprecedented growth, with total value locked (TVL) across L2 networks reaching $35 billion. This surge comes as mainnet gas fees have dropped to their lowest levels in six months, making DeFi interactions more accessible to retail users.

**Arbitrum** and **Optimism** are leading the charge, collectively processing over 4 million transactions daily. The data shows a clear trend of users migrating from mainnet to L2 solutions for everyday DeFi activities, while mainnet is increasingly reserved for high-value settlements and NFT trades.`,
    dataPoints: [
      { title: "L2 TVL", value: "$35.1B", change: 18 },
      { title: "Mainnet Gas (Gwei)", value: "12", change: -45 },
      { title: "L2 Daily Transactions", value: "4.2M", change: 28 },
      { title: "ETH Staking APY", value: "3.8%", change: 0.2 },
    ],
  },
  {
    id: "3",
    date: "October 30, 2025",
    headline: "DeFi Protocol Yields Show Recovery After Market Correction",
    content: `Following last week's market-wide correction, DeFi lending protocols are showing signs of yield recovery. Major platforms like **Aave** and **Compound** are seeing increased borrowing activity as traders position themselves for potential market moves.

The analysis indicates that stablecoin yields have stabilized around 8-12% APY, while volatile asset lending continues to offer double-digit returns for risk-tolerant investors. This normalization suggests the market is finding equilibrium after the volatility spike.`,
    dataPoints: [
      { title: "Avg Stablecoin Yield", value: "9.5%", change: 1.2 },
      { title: "Total Borrowed", value: "$18.7B", change: 15 },
      { title: "Liquidation Risk", value: "Low", change: -8 },
      { title: "Protocol TVL", value: "$62.3B", change: 5 },
    ],
  },
];

export default function Journal() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry>(
    mockEntries[0]
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Pane - Entry List */}
      <div className="w-full md:w-[35%] border-r border-border bg-muted/20 overflow-y-auto">
        <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0">
          <h2 className="text-xl font-bold">Journal Entries</h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI-generated insights
          </p>
        </div>

        <div className="p-2">
          {mockEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className={`
                w-full text-left p-4 mb-2 rounded-lg transition-all duration-200
                ${
                  selectedEntry.id === entry.id
                    ? "bg-primary/10 border-l-4 border-primary shadow-elegant"
                    : "bg-card hover:bg-muted/50 border-l-4 border-transparent"
                }
              `}
            >
              <div className="text-xs text-muted-foreground mb-1 font-medium">
                {entry.date}
              </div>
              <div className="font-semibold text-sm leading-tight">
                {entry.headline}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Pane - Full Entry */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {selectedEntry.date}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {selectedEntry.headline}
              </h1>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
            {selectedEntry.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-base leading-relaxed mb-4">
                {paragraph.split("**").map((part, i) =>
                  i % 2 === 0 ? (
                    part
                  ) : (
                    <strong key={i} className="font-bold text-primary">
                      {part}
                    </strong>
                  )
                )}
              </p>
            ))}
          </div>

          {/* Data Points */}
          <div>
            <h3 className="text-xl font-bold mb-4">Key Data Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedEntry.dataPoints.map((dataPoint, idx) => (
                <Card key={idx} className="p-4 shadow-elegant card-gradient">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    {dataPoint.title}
                  </h4>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">{dataPoint.value}</div>
                    {dataPoint.change !== undefined && (
                      <Badge
                        variant={dataPoint.change >= 0 ? "default" : "destructive"}
                        className={
                          dataPoint.change >= 0
                            ? "bg-success text-success-foreground"
                            : ""
                        }
                      >
                        {dataPoint.change > 0 ? "+" : ""}
                        {dataPoint.change}%
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
