import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export interface TokenTransferUIProps {
  onTransfer: (recipient: string, amount: number) => Promise<void>;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
  isConnected: boolean;
  isLoading: boolean;
  walletAddress?: string;
  txSignature?: string;
  balance: number | null;  // Add this
}

export function TokenTransferUI({
  onTransfer,
  onConnect,
  onDisconnect,
  isConnected,
  isLoading,
  walletAddress,
  txSignature,
  balance,
}: TokenTransferUIProps) {
  const [recipient, setRecipient] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleOpenTxLink = () => {
    if (txSignature) {
      Linking.openURL(`https://solscan.io/tx/${txSignature}?cluster=devnet`);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Transfer SOL
      </Text>
      <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
        Transfer SOL using Lazorkit Passkey
        {'\n'}
        100% on-chain without wallet connection
        {'\n'}
        (Devnet Only)
        {'\n'}
        (No Wallet Required)
      </Text>

      {!isConnected ? (
        <Button
          mode="contained"
          onPress={onConnect}
          loading={isLoading}
          style={styles.button}
        >
          Connect with Passkey
        </Button>
      ) : (
        <>
          <View style={styles.walletInfo}>
            <View>
              <Text variant="bodyMedium">
                From: {walletAddress?.slice(0, 8)}...
              </Text>
              <Text variant="bodyMedium" style={styles.balance}>
                Balance: {balance?.toFixed(4) ?? '...'} SOL
              </Text>
            </View>
            <Button
              mode="outlined"
              onPress={onDisconnect}
              compact
            >
              Disconnect
            </Button>
          </View>

          <TextInput
            label="Recipient Address"
            value={recipient}
            onChangeText={setRecipient}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Amount (SOL)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={styles.input}
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={() => onTransfer(recipient, parseFloat(amount))}
            loading={isLoading}
            disabled={!recipient || !amount || isLoading || !balance || balance < parseFloat(amount)}
            style={styles.button}
          >
            Transfer SOL
          </Button>

          {balance !== null && balance < parseFloat(amount || '0') && (
            <Text style={styles.errorText}>
              Insufficient balance for this transfer
            </Text>
          )}

          {txSignature && (
            <Button
              mode="outlined"
              onPress={handleOpenTxLink}
              style={styles.txLink}
            >
              View on Solscan
            </Button>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  walletInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  txLink: {
    marginTop: 16,
  },
  balance: {
    marginTop: 4,
    color: 'yellow',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff4444',
    marginTop: 8,
    textAlign: 'center',
  }
});