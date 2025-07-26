// Adapted version of useMobileWallet.tsx for use with Solana Kit or Gill
import {
    transact,
    MobileWallet,
  } from "@solana-mobile/mobile-wallet-adapter-protocol";
  import { Account, useAuthorization } from "./useAuthorization";
  import { useCallback, useMemo } from "react";
  
  export function useMobileWalletWithKit() {
    const { authorizeSessionWithSignIn, authorizeSession, deauthorizeSession } =
      useAuthorization();
  
    const connect = useCallback(async (): Promise<Account> => {
      return await transact(async (wallet: MobileWallet) => {
        return await authorizeSession(wallet);
      });
    }, [authorizeSession]);
  
    const signIn = useCallback(async (): Promise<Account> => {
      return await transact(async (wallet: MobileWallet) => {
        return await authorizeSessionWithSignIn(wallet);
      });
    }, [authorizeSession]);
  
    const disconnect = useCallback(async (): Promise<void> => {
      await transact(async (wallet: MobileWallet) => {
        await deauthorizeSession(wallet);
      });
    }, [deauthorizeSession]);
  
    const signAndSendTransactionsMadeWithKit = useCallback(
      async (
        transactionPayloads: string[] // base64 encoded transaction strings
      ): Promise<string[]> => {
        return await transact(async (wallet: MobileWallet) => {
          await authorizeSession(wallet);
          const result = await wallet.signAndSendTransactions({
            payloads: transactionPayloads,
          });
          return result.signatures;
        });
      },
      [authorizeSession]
    );
  
      const signTransactionsMadeWithKit = useCallback(
    async (
      transactionPayloads: string[] // base64 encoded transaction strings
    ): Promise<string[]> => {
      return await transact(async (wallet: MobileWallet) => {
        await authorizeSession(wallet);
        const result = await wallet.signTransactions({
          payloads: transactionPayloads,
        });
        return result.signed_payloads;
      });
    },
    [authorizeSession]
  );
  
    return useMemo(
      () => ({
        connect,
        signIn,
        disconnect,
        signAndSendTransactionsMadeWithKit,
        signTransactionsMadeWithKit,
      }),
      [signAndSendTransactionsMadeWithKit, signTransactionsMadeWithKit]
    );
  }