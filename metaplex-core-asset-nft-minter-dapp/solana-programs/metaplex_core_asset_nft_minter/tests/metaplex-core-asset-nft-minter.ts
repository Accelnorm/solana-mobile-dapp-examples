import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MetaplexCoreAssetNftMinter } from "../target/types/metaplex_core_asset_nft_minter";
import { Keypair } from "@solana/web3.js";

describe("metaplex_core_asset_nft_minter", () => {
  // 1. Proper provider setup
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  
  const program = anchor.workspace.MetaplexCoreAssetNftMinter as Program<MetaplexCoreAssetNftMinter>;
  const wallet = provider.wallet;
  const connection = provider.connection;

  it("Create Core NFT Asset", async () => {
    // 2. Generate asset keypair
    const asset = Keypair.generate();

    const createAssetArgs = {
      name: "My Core NFT",
      uri: "https://raw.githubusercontent.com/dProgrammingUniversity/metaplex-core-nft-asset-example/refs/heads/main/my-core-nft.json", // Replace with your actual URI
    };

    // 3. Send transaction
    const tx = await program.methods.createCoreAsset(createAssetArgs)
      .accounts({
        asset: asset.publicKey,
        collection: null,
        authority: null,
        payer: wallet.publicKey,
        owner: null,
        updateAuthority: null,
      })
      .signers([asset]) // 4. Only asset needs explicit signing
      .rpc();

    console.log(`Success! Transaction Signature: ${tx}`);
    console.log(`Asset Public Key: ${asset.publicKey.toString()}`);
    console.log(`Asset Name: ${createAssetArgs.name}`);
    console.log(`Asset URI: ${createAssetArgs.uri}`);
    // console log tx id with solscan explorer link 
    console.log(`Solscan: https://solscan.io/tx/${tx}?cluster=devnet`);
    // console log tx id with solana explorer link
    console.log(`Solana Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    
    // 5. Confirm transaction
    await connection.confirmTransaction(tx, "confirmed");
    console.log("Transaction confirmed");

    // 6. Verify asset creation
    const assetInfo = await connection.getAccountInfo(asset.publicKey);
    if (!assetInfo) {
      throw new Error("Asset account not created");
    }
    console.log(`Asset created at: ${asset.publicKey.toString()}`);
    console.log(`Owner: ${wallet.publicKey.toString()}`);
  });
});