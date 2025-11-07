// src/hooks/usePortfolioSocket.ts

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { toast } from "sonner"; // <-- Import the toast function

export const usePortfolioSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io('wss://your-api-server.com');

    socket.on('connect', () => {
      console.log('WebSocket connected!');
      toast.success("Real-time connection established.");
    });

    // --- ADD ERROR HANDLING ---
    socket.on('disconnect', () => {
      console.warn('WebSocket disconnected!');
      toast.error("Real-time connection lost. Data may be stale.");
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err.message);
      toast.error("Failed to connect for real-time updates.");
    });
    // --- END ERROR HANDLING ---

    socket.on('priceUpdate', (update: { symbol: string, price: number }) => {
      queryClient.setQueryData(['portfolioAssets'], (oldData: any) => {
        if (!oldData) return oldData;
        
        return oldData.map((asset: any) =>
          asset.symbol === update.symbol
            ? { ...asset, price: update.price }
            : asset
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
