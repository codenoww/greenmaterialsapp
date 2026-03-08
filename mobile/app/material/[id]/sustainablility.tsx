import {
  ScrollView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../src/theme/colors";
import { Card } from "../../../src/components/Card";
import { useMaterial } from "../../../src/context/MaterialContext";

export default function SustainabilityTab() {
  const state = useMaterial();

  // 🔄 Explicit state handling (required)
  if (state.status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>Loading…</Text>
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
  const { sustainability } = material;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          {sustainability.summary ? (
            <Text style={styles.summary}>
              {sustainability.summary}
            </Text>
          ) : (
            <Text style={styles.empty}>
              No sustainability summary available.
            </Text>
          )}
        </Card>

        {sustainability.benefits.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>
              Benefits
            </Text>

            {sustainability.benefits.map(
              (benefit, index) => (
                <Text
                  key={index}
                  style={styles.bullet}
                >
                  • {benefit}
                </Text>
              )
            )}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  summary: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.textPrimary,
  },
  bullet: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  empty: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
