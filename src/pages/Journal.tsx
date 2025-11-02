import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// ... (Interface and mock data remain the same)
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
  // ... mock data
];


export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setEntries(mockEntries);
      setSelectedEntry(mockEntries[0]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 mb-2 bg-card rounded-lg">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))
          ) : (
            entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className={`
                  w-full text-left p-4 mb-2 rounded-lg transition-all duration-200
                  ${
                    selectedEntry?.id === entry.id
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
            ))
          )}
        </div>
      </div>

      {/* Right Pane - Full Entry */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          {loading || !selectedEntry ? (
            <div>
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-10 w-4/5 mb-6" />
              <div className="space-y-4 mb-8">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <Skeleton className="h-8 w-1/3 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                 {/* ... (Header content remains the same) */}
              </div>

              {/* Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
                {/* ... (Content mapping remains the same) */}
              </div>

              {/* Data Points */}
              <div>
                {/* ... (Data points mapping remains the same) */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
