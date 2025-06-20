// /src/screens/MCANFTMinterScreen.tsx
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { NFTMinterFeature } from "../components/nft-minter/nft-minter-feature";

export default function MCANFTMinterScreen() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.screenContainer}>
        <Text variant="displaySmall" style={styles.title}>
          Mint Your NFT
        </Text>
        <NFTMinterFeature />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#31473A', // Dark green background
  },
  title: {
    fontWeight: "bold",
    marginBottom: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});