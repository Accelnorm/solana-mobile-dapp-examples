import React from 'react';
import { Alert } from 'react-native';
import { useLazorTransfer } from './token-transfer-data-access';
import { TokenTransferUI } from './token-transfer-ui';
import { APP_REDIRECT_URL } from '../../utils/lazorkit/LazorKitProvider';

export function TokenTransferFeature() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [txSignature, setTxSignature] = React.useState<string>();
  const { 
    transferSOL, 
    isConnected, 
    connect, 
    disconnect, 
    smartWalletPubkey,
    balance,
  } = useLazorTransfer();

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await connect({
        redirectUrl: APP_REDIRECT_URL,
        onSuccess: (wallet) => {
          Alert.alert('Success', 'Connected with passkey!');
        },
        onFail: (error) => {
          Alert.alert('Error', error.message);
        },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setTxSignature(undefined);
      Alert.alert('Success', 'Disconnected successfully!');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to disconnect: ' + error.message);
    }
  };

  const handleTransfer = async (recipient: string, amount: number) => {
    try {
      setIsLoading(true);
      const signature = await transferSOL(recipient, amount);
      setTxSignature(signature);
      Alert.alert(
        'Success',
        `Transferred ${amount} SOL successfully!\nTransaction: ${signature.slice(0, 8)}...`
      );
    } catch (error: any) {
      Alert.alert('Error', 'Transfer failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TokenTransferUI
      onTransfer={handleTransfer}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      isConnected={isConnected}
      isLoading={isLoading}
      walletAddress={smartWalletPubkey?.toBase58()}
      txSignature={txSignature}
      balance={balance}
    />
  );
}