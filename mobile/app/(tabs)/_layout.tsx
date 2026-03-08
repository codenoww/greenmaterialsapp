import { Tabs } from "expo-router";
import { colors } from "../../src/theme/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary, // Sage Green
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#2F4F3E",
        tabBarInactiveTintColor: "#6A8F76",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="materials" options={{ title: "Materials" }} />
      <Tabs.Screen name="recommend" options={{ title: "Recommend" }} />
    </Tabs>
  );
}
