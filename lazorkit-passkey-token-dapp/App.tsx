// Polyfills
import "./src/polyfills";

import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import { AppNavigator } from "./src/navigators/AppNavigator";
import { LazorKitProvider } from "./src/utils/lazorkit/LazorKitProvider";

export default function App() {
  const colorScheme = useColorScheme();
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };
  return (
    <SafeAreaView
      style={[
        styles.shell,
        {
          backgroundColor:
            colorScheme === "dark"
              ? MD3DarkTheme.colors.background
              : MD3LightTheme.colors.background,
        },
      ]}
    >
      <PaperProvider
        theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        <LazorKitProvider>
          <AppNavigator />
        </LazorKitProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});
