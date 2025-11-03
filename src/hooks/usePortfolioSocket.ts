// Create a new hook: src/hooks/usePortfolioSocket.ts

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client'; // A popular WebSocket library

export const usePortfolioSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('wss://your-api-server.com');

    socket.on('connect', () => {
      console.log('WebSocket connected!');
    });

    // Listen for the 'priceUpdate' event
    socket.on('priceUpdate', (update: { symbol: string, price: number }) => {
      // Update the TanStack Query cache directly
      queryClient.setQueryData(['portfolioAssets'], (oldData: any) => {
        if (!oldData) return oldData;
        
        // Find the asset to update and return the new state
        return oldData.map((asset: any) =>
          asset.symbol === update.symbol
            ? { ...asset, price: update.price }
            : asset
        );
      });
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
