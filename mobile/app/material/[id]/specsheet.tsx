import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMaterial } from "../../../src/context/MaterialContext";
import { colors } from "../../../src/theme/colors";
import { Card } from "../../../src/components/Card";

export default function SpecSheetScreen() {
  const state = useMaterial();

  // 🔄 Required explicit handling
  if (state.status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>Loading spec sheet…</Text>
      </SafeAreaView>
    );
  }

  if (state.status === "error") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>{state.error}</Text>
      </SafeAreaView>
    );
  }

  // ✅ Guaranteed material
  const { material } = state;

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>{material.name}</Text>

        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>
          {material.category}
        </Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          {material.description}
        </Text>
      </Card>

      {Object.keys(material.specs).length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>
            Specifications
          </Text>

          {Object.entries(material.specs).map(
            ([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>
                  {key}
                </Text>
                <Text style={styles.specValue}>
                  {String(value)}
                </Text>
              </View>
            )
          )}
        </Card>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textMuted,
    marginTop: 12,
  },
  value: {
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.textPrimary,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  specKey: {
    fontSize: 14,
    color: colors.textMuted,
  },
  specValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  empty: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
