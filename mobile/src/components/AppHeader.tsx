import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const AppHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Green Materials</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F4F3E",
  },
});
