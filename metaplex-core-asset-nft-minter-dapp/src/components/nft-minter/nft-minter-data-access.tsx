// /src/components/nft-minter/nft-minter-data-access.tsx
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import { useConnection } from "../../utils/ConnectionProvider";
import { useAnchorWallet } from "../../utils/useAnchorWallet";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { alertAndLog } from "../../utils/alertAndLog";
import { MetaplexCoreAssetNftMinter } from "./types/metaplex_core_asset_nft_minter";
import idl from "./idl/metaplex_core_asset_nft_minter.json";

const PROGRAM_ID = new PublicKey("AU7v6oJmoHWwHPNCAjSzjbCQpgvi8ZZ4vKGNZ33ScwJT");

export function useNFTMinter() {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  // Create provider when wallet is available
  const provider = useMemo(() => {
    if (!anchorWallet) {
      return;
    }
    return new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "confirmed",
      commitment: "processed",
    });
  }, [anchorWallet, connection]);

  // Initialize program with provider
  const program = useMemo(() => {
    if (!provider) {
      return;
    }

    // Create program instance with provider
    return new Program(
      idl,
      provider
    ) as Program<MetaplexCoreAssetNftMinter>;
  }, [provider]);

  const mintNFT = useMutation({
    mutationKey: ["mint-nft"],
    mutationFn: async ({ name, uri }: { name: string; uri: string }) => {
      if (!program || !anchorWallet) {
        throw new Error("Program not initialized");
      }

      console.log('🎲 Generating new NFT keypair...');
      const asset = Keypair.generate();
      
      console.log('📝 Preparing transaction...');
      console.log(`Name: ${name}`);
      console.log(`URI: ${uri}`);
      
      const tx = await program.methods
        .createCoreAsset({
          name,
          uri
        })
        .accounts({
          asset: asset.publicKey,
          collection: null,
          authority: undefined,
          payer: anchorWallet.publicKey,
          owner: null,
          updateAuthority: null,
        })
        .signers([asset])
        .rpc();

      console.log('✅ Transaction sent:', tx);
      console.log('🔑 Asset public key:', asset.publicKey.toString());

      return { 
        signature: tx,
        assetId: asset.publicKey.toString()
      };
    },
    onSuccess: ({ signature, assetId }) => {
      console.log('🎉 NFT minted successfully!');
      console.log('📋 Transaction details:');
      console.log(`Asset ID: ${assetId}`);
      console.log(`Explorer: https://solscan.io/tx/${signature}?cluster=devnet`);
      
      alertAndLog(
        "NFT Minted Successfully!", 
        `Asset ID: ${assetId}\nView on Solscan: https://solscan.io/tx/${signature}?cluster=devnet`
      );
    },
    onError: (error: Error) => {
      console.error('❌ Mint failed:', error);
      alertAndLog("Mint Failed", error.message);
    }
  });

  return {
    mintNFT,
    isInitialized: !!program
  };
}