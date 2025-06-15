import { ScrollView, StyleSheet, View } from "react-native";
import { TokenTransferFeature } from "../components/token-transfer/token-transfer-feature";

export default function TokenTransferScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.screenContainer}>
        <TokenTransferFeature />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#904e95',
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
});
