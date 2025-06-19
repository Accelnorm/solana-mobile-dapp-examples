// /src/services/ipfs.ts
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export class IPFSService {
  private static instance: IPFSService;
  private apiKey: string;
  private apiSecret: string;
  private gateway: string;

  private constructor() {
    this.apiKey = process.env.EXPO_PUBLIC_PINATA_API_KEY || '';
    this.apiSecret = process.env.EXPO_PUBLIC_PINATA_API_SECRET || '';
    this.gateway = 'https://gateway.pinata.cloud/ipfs';

    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Pinata credentials not configured');
    }
    console.log('🔌 Pinata IPFS Service initialized');
  }

  public static getInstance(): IPFSService {
    if (!IPFSService.instance) {
      IPFSService.instance = new IPFSService();
    }
    return IPFSService.instance;
  }

  private getMimeType(uri: string): string {
    // Extract file extension from URI
    const extension = uri.split('.').pop()?.toLowerCase() || 'jpg';

    // Map common image extensions to MIME types
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      bmp: 'image/bmp',
    };

    return mimeTypes[extension] || 'image/jpeg';
  }

  private async uploadFileToPinata(uri: string, fileName: string): Promise<string> {
    try {
      // Create form data with proper file structure
      const formData = new FormData();

      // Append file with correct structure
      formData.append('file', {
        uri,
        name: fileName,
        type: this.getMimeType(uri),
      } as any);

      // Add metadata
      formData.append('pinataMetadata', JSON.stringify({
        name: fileName
      }));

      // Add options
      formData.append('pinataOptions', JSON.stringify({
        cidVersion: 0
      }));

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'pinata_api_key': this.apiKey,
            'pinata_secret_api_key': this.apiSecret,
          },
        }
      );

      if (!response.data.IpfsHash) {
        throw new Error('No IPFS hash returned');
      }

      return response.data.IpfsHash;
    } catch (error) {
      console.error('❌ Pinata file upload error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      }
      throw new Error('Upload to Pinata failed: ' + (error as Error).message);
    }
  }

  private async uploadJsonToPinata(json: object): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          pinataContent: json,
          pinataMetadata: {
            name: 'metadata.json'
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'pinata_api_key': this.apiKey,
            'pinata_secret_api_key': this.apiSecret,
          },
        }
      );

      if (!response.data.IpfsHash) {
        throw new Error('No IPFS hash returned');
      }

      return response.data.IpfsHash;
    } catch (error) {
      console.error('❌ Pinata JSON upload error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      }
      throw new Error('Upload to Pinata failed: ' + (error as Error).message);
    }
  }

  async uploadNFTAsset(name: string, imageUri: string): Promise<string> {
    try {
      console.log('📤 Starting NFT asset upload...');

      // Simple filename from name (replace spaces)
      const fileName = `${name.replace(/\s+/g, '-')}.${imageUri.split('.').pop() || 'jpg'}`;

      // Upload image
      console.log('🖼️ Uploading image...');
      const imageHash = await this.uploadFileToPinata(imageUri, fileName);
      const imageUrl = `${this.gateway}/${imageHash}`;
      console.log('✨ Image uploaded:', imageUrl);

      // Create and upload metadata
      console.log('📝 Creating metadata...');
      const metadata = {
        name,
        description: "Created with dPU Solana Mobile dApp Examples",
        image: imageUrl,
        attributes: [
          {
            "trait_type": "Type",
            "value": "Non-Fungible Token"
          },
          {
            "trait_type": "Blockchain",
            "value": "Solana"
          },
          {
            "trait_type": "NFT-Standard",
            "value": "Metaplex Core"
          },
          {
            "trait_type": "Color",
            "value": "Golden"
          },
          {
            "trait_type": "Background",
            "value": "Transparent"
          }
        ]
      };

      const metadataHash = await this.uploadJsonToPinata(metadata);
      const metadataUrl = `${this.gateway}/${metadataHash}`;

      console.log('✅ Metadata uploaded:', metadataUrl);
      return metadataUrl;
    } catch (error) {
      console.error('❌ NFT asset upload failed:', error);
      throw error instanceof Error ? error : new Error('Failed to upload to IPFS');
    }
  }
}