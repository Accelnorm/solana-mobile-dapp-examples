import { useLazorWallet } from '@lazorkit/wallet-mobile-adapter';
import { PublicKey, TransactionInstruction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useContext, useCallback, useState, useEffect } from 'react';
import { LazorKitConnectionContext, APP_REDIRECT_URL } from '../../utils/lazorkit/LazorKitProvider';

export function useLazorTransfer() {
  const { smartWalletPubkey, isConnected, connect, signMessage, disconnect } = useLazorWallet();
  const connection = useContext(LazorKitConnectionContext);
  const [balance, setBalance] = useState<number | null>(null);

  // Function to fetch balance
  const fetchBalance = useCallback(async () => {
    if (!smartWalletPubkey || !connection) return;
    
    try {
      const lamports = await connection.getBalance(smartWalletPubkey);
      const solBalance = lamports / LAMPORTS_PER_SOL;
      setBalance(solBalance);
      console.log('Smart Wallet Address:', smartWalletPubkey.toBase58());
      console.log('Current Balance:', solBalance, 'SOL');
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    }
  }, [smartWalletPubkey, connection]);

  // Fetch balance when wallet connects or after transfers
  useEffect(() => {
    if (isConnected) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [isConnected, fetchBalance]);

  // Transfer SOL tokens
  const transferSOL = useCallback(async (recipientAddress: string, amount: number) => {
    if (!smartWalletPubkey || !connection) throw new Error('Wallet not connected');
    if (!balance) throw new Error('Balance not loaded');
    if (balance < amount) throw new Error(`Insufficient balance. Current balance: ${balance} SOL`);

    try {
      // Create transfer instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      });

      const signature = await signMessage(instruction, {
        redirectUrl: APP_REDIRECT_URL,
        onSuccess: async (sig) => {
          console.log('Transfer successful:', sig);
          // Refresh balance after successful transfer
          await fetchBalance();
        },
        onFail: (error) => {
          console.error('Transfer failed:', error);
          throw error;
        },
      });

      return signature;
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  }, [smartWalletPubkey, signMessage, connection, balance, fetchBalance]);

  return {
    transferSOL,
    isConnected,
    connect,
    disconnect,
    smartWalletPubkey,
    balance,
    fetchBalance
  };
}