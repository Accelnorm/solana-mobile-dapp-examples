import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { TokenTransferScreen, BlankScreen } from "../screens";

const Tab = createBottomTabNavigator();

/**
 * This is the main navigator with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function HomeNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Transfer":
              return (
                <MaterialCommunityIcon
                  name={focused ? "hand-coin" : "hand-coin-outline"}
                  size={size}
                  color={color}
                />
              );
            case "Blank":
              return (
                <MaterialCommunityIcon
                  name={focused ? "application-edit" : "application-edit-outline"}
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Transfer" component={TokenTransferScreen} />
      <Tab.Screen name="Blank" component={BlankScreen} />
    </Tab.Navigator>
  );
}
