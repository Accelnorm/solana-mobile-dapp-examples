import React from 'react';
import { LazorKitWalletProvider } from '@lazorkit/wallet-mobile-adapter';
import { Connection } from '@solana/web3.js';

// Constants for the provider
const DEVNET_RPC_URL = 'https://api.devnet.solana.com';
const IPFS_URL = 'https://portal.lazor.sh';
const PAYMASTER_URL = 'https://lazorkit-paymaster.onrender.com';
export const APP_REDIRECT_URL = 'lazorkitpasskeytokendapp://'; // Add this line

// Create a connection context
export const LazorKitConnectionContext = React.createContext<Connection | null>(null);

export const LazorKitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create connection instance
  const connection = React.useMemo(
    () => new Connection(DEVNET_RPC_URL, 'confirmed'),
    []
  );

  return (
    <LazorKitConnectionContext.Provider value={connection}>
      <LazorKitWalletProvider
        rpcUrl={DEVNET_RPC_URL}
        ipfsUrl={IPFS_URL}
        paymasterUrl={PAYMASTER_URL}
      >
        {children}
      </LazorKitWalletProvider>
    </LazorKitConnectionContext.Provider>
  );
};