// Create a new file: src/api/portfolioService.ts

// This interface should match the one in your component
interface Asset {
  id: string;
  // ... other properties
}

// This function simulates fetching data from a backend API
export const getPortfolioAssets = async (): Promise<Asset[]> => {
  console.log("Fetching latest portfolio data...");
  // In a real app, this would be:
  // const response = await fetch('/api/portfolio');
  // if (!response.ok) throw new Error('Network response was not ok');
  // return response.json();

  // For now, we'll return the mock data to simulate a successful API call
  const mockAssets = [
    { id: "1", name: "Bitcoin", symbol: "BTC", balance: 2.5, price: 98234 + Math.random() * 1000, /*...*/ },
    { id: "2", name: "Ethereum", symbol: "ETH", balance: 45.8, price: 3678 - Math.random() * 100, /*...*/ },
  ];
  return new Promise(resolve => setTimeout(() => resolve(mockAssets), 500));
};
