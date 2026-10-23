import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMaterial } from "../../../src/context/MaterialContext";
import { colors } from "../../../src/theme/colors";
import { Card } from "../../../src/components/Card";

export default function LeedTab() {
  const state = useMaterial();

  // 🔄 Explicit state handling (required)
  if (state.status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>Loading LEED data…</Text>
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
  const { leed } = material;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Text style={styles.points}>
            LEED Points: {leed.points}
          </Text>
        </Card>

        {leed.credits.length > 0 ? (
          <Card>
            <Text style={styles.sectionTitle}>
              Applicable Credits
            </Text>

            {leed.credits.map((credit, index) => (
              <Text
                key={index}
                style={styles.bullet}
              >
                • {credit}
              </Text>
            ))}
          </Card>
        ) : (
          <Card>
            <Text style={styles.empty}>
              No LEED credits available for this
              material.
            </Text>
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
  points: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
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
