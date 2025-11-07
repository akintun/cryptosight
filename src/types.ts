// src/types.ts

export interface Asset {
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
