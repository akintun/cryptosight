// src/hooks/usePortfolioSocket.ts

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { toast } from "sonner"; // <-- Import toast for notifications
import { Asset } from '@/types'; // <-- Import Asset type from central file

export const usePortfolioSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Connect to the WebSocket server
    // Replace with your actual server URL from environment variables
    const socket = io('wss://your-api-server.com');

    socket.on('connect', () => {
      console.log('WebSocket connected!');
      toast.success("Real-time connection established.");
    });

    // --- ADDED ERROR AND DISCONNECT HANDLING ---
    socket.on('disconnect', () => {
      console.warn('WebSocket disconnected!');
      toast.error("Real-time connection lost. Data may be stale.");
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err.message);
      toast.error("Failed to connect for real-time updates.", {
        description: "Please check your network connection.",
      });
    });
    // --- END OF ADDED CODE ---

    // Listen for the 'priceUpdate' event
    socket.on('priceUpdate', (update: { symbol: string, price: number }) => {
      // Update the TanStack Query cache directly
      queryClient.setQueryData(['portfolioAssets'], (oldData: Asset[] | undefined) => {
        if (!oldData) return oldData;
        
        // Find the asset to update and return the new state
        return oldData.map((asset: Asset) =>
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
