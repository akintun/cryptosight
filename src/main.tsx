// src/main.tsx

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// --- WAGMI IMPORTS ---
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
// --- END WAGMI IMPORTS ---

// Create the wagmi configuration
export const config = createConfig({
  chains: [mainnet, sepolia], // Add the chains you want to support
  connectors: [
    injected(), // This supports MetaMask and other browser-injected wallets
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// Wrap your App component with the WagmiProvider
createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <App />
  </WagmiProvider>,
);
