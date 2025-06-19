// /src/components/nft-minter/nft-minter-feature.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NFTMinterForm } from './nft-minter-ui';
import { useNFTMinter } from './nft-minter-data-access';
import { useAuthorization } from '../../utils/useAuthorization';

export function NFTMinterFeature() {
  const { selectedAccount } = useAuthorization();
  const { mintNFT } = useNFTMinter(); 
  const [txSignature, setTxSignature] = useState<string | null>(null);

  if (!selectedAccount) {
    return (
      <View style={styles.container}>
        <Text variant="titleMedium">Please connect your wallet first</Text>
      </View>
    );
  }

  const handleMint = async (name: string, uri: string) => {
    try {
      const result = await mintNFT.mutateAsync({ name, uri });
      setTxSignature(result.signature);
      alert('NFT Minted Successfully!');
    } catch (error) {
      console.error('Mint failed:', error);
      alert('Mint failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleViewNFT = () => {
    if (txSignature) {
      Linking.openURL(`https://solscan.io/tx/${txSignature}?cluster=devnet`);
    }
  };

  return (
    <View style={styles.container}>
      <NFTMinterForm
        onMint={handleMint}
        isMinting={mintNFT.isPending}
      />
      {txSignature && (
        <View style={styles.txContainer}>
          <Text style={styles.txText}>Transaction ID: {txSignature}</Text>
          <Button 
            mode="contained" 
            onPress={handleViewNFT}
            style={styles.viewButton}
          >
            View NFT on Solscan
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  txContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  txText: {
    fontSize: 12,
    marginBottom: 8,
  },
  viewButton: {
    marginTop: 8,
  },
});