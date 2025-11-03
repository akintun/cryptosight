// src/components/ConnectWallet.tsx

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet } from "lucide-react";

// Helper function to truncate a wallet address
const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    // --- RENDER THIS WHEN CONNECTED ---
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {truncateAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // --- RENDER THIS WHEN DISCONNECTED ---
  // We use the first available connector, which is typically MetaMask.
  const injectedConnector = connectors[0];

  return (
    <>
      {/* Desktop Button */}
      <Button
        variant="connect"
        size="sm"
        className="hidden lg:flex"
        onClick={() => connect({ connector: injectedConnector })}
      >
        Connect Wallet
      </Button>

      {/* Mobile Button */}
      <Button
        variant="connect"
        size="icon"
        className="lg:hidden"
        onClick={() => connect({ connector: injectedConnector })}
      >
        <Wallet className="w-4 h-4" />
      </Button>
    </>
  );
}
