// /src/components/nft-minter/nft-minter-ui.tsx
import React, { useState, useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { IPFSService } from '../../services/ipfs';

interface NFTMinterFormProps {
  onMint: (name: string, uri: string) => Promise<void>;
  isMinting: boolean;
}

export function NFTMinterForm({ onMint, isMinting }: NFTMinterFormProps) {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUri, setUploadedUri] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  // Get singleton instance
  const ipfsService = useMemo(() => IPFSService.getInstance(), []);

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets?.[0]?.uri) {
        setImage(result.assets[0].uri);
        setStatus('Image selected');
        setUploadedUri(null); // Reset uploaded state when new image selected
      }
    } catch (error) {
      console.error('Image selection failed:', error);
      setStatus('Failed to select image');
    }
  };

  const uploadToIPFS = async () => {
    if (!image || !name) {
      setStatus('Please select an image and enter a name');
      return;
    }

    try {
      setIsUploading(true);
      setStatus('Uploading to IPFS...');
      
      const uri = await ipfsService.uploadNFTAsset(name, image);
      setUploadedUri(uri);
      setStatus('Success! Click "Mint NFT" to proceed.');
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setStatus(`Failed: ${errorMsg}`);
      
      // Provide more detailed error feedback
      if (errorMsg.includes('credentials')) {
        alert('Pinata credentials error. Check your API keys in .env file');
      } else if (errorMsg.includes('400')) {
        alert('Invalid file format. Please try with a different image');
      } else {
        alert(`Upload failed: ${errorMsg}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleMint = async () => {
    if (!uploadedUri || !name) return;
    try {
      setStatus('Minting your NFT on Solana...');
      await onMint(name, uploadedUri);
    } catch (error) {
      console.error('Mint failed:', error);
      setStatus('Mint failed: ' + (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="NFT Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
        disabled={isUploading || isMinting}
      />

      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <Button
            mode="outlined"
            onPress={selectImage}
            style={styles.changeButton}
            disabled={isUploading || isMinting}
          >
            Change Image
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          onPress={selectImage}
          style={styles.button}
          disabled={isUploading || isMinting}
        >
          Select Image
        </Button>
      )}

      {status ? (
        <View style={styles.statusContainer}>
          {(isUploading || isMinting) && <ActivityIndicator style={styles.spinner} />}
          <Text style={styles.status}>{status}</Text>
        </View>
      ) : null}

      {image && !uploadedUri && (
        <Button
          mode="contained"
          onPress={uploadToIPFS}
          style={styles.button}
          disabled={!image || !name || isUploading}
          loading={isUploading}
        >
          Upload to IPFS
        </Button>
      )}

      {uploadedUri && (
        <Button
          mode="contained"
          onPress={handleMint}
          style={[styles.button, styles.mintButton]}
          disabled={!uploadedUri || isMinting}
          loading={isMinting}
        >
          Mint NFT
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
    borderRadius: 8,
  },
  button: {
    marginBottom: 16,
  },
  changeButton: {
    marginTop: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  spinner: {
    marginRight: 8,
  },
  status: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#666',
  },
  mintButton: {
    backgroundColor: '#4CAF50', // Green color for mint button
  },
});