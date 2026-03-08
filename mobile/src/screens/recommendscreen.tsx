import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme/colors";
import { AppHeader } from "../components/AppHeader";
import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";

export default function RecommendScreen() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runRecommendation = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(
        "Low-Carbon Concrete is recommended because it reduces embodied carbon by 18% while improving LEED MR credits."
      );
      setLoading(false);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 🌿 PROMPT CARD */}
        <Card>
          <Text style={styles.sectionTitle}>
            Describe Your Requirement
          </Text>

          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            placeholder="e.g. low VOC, low carbon, office renovation"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            multiline
          />

          <PrimaryButton
            label={loading ? "Analyzing…" : "Get Recommendation"}
            onPress={runRecommendation}
          />
        </Card>

        {/* 🤖 AI RESULT */}
        {result && (
          <Card>
            <Text style={styles.sectionTitle}>
              AI Recommendation
            </Text>

            <Text style={styles.recoTitle}>
              Low-Carbon Concrete
            </Text>

            <Text style={styles.recoText}>
              {result}
            </Text>

            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>−18% CO₂</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>LEED +3</Text>
              </View>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 10,
  },

  input: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    padding: 14,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },

  recoTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  recoText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
  },

  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  badge: {
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: "500",
  },
});
