import React, { useMemo, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AppHeader } from "../components/AppHeader";
import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme/colors";
import {
  GreenMaterial,
  HouseArea,
  materialAreas,
  recommendForPlan,
} from "../data/greenDirectory";

const examplePlan =
  "Two-storey residence with concrete foundation, brick walls, bamboo flooring, low VOC paint, roof insulation, and efficient windows.";

export default function RecommendScreen() {
  const [plan, setPlan] = useState(examplePlan);
  const [selectedAreas, setSelectedAreas] = useState<HouseArea[]>([
    "Foundation",
    "Walls",
    "Flooring",
    "Paint",
  ]);
  const [hasRun, setHasRun] = useState(true);

  const recommendations = useMemo(
    () => recommendForPlan(plan, selectedAreas),
    [plan, selectedAreas]
  );

  function toggleArea(area: HouseArea) {
    setSelectedAreas((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : [...current, area]
    );
  }

  function runRecommendation() {
    setHasRun(true);
  }

  const averageScore =
    recommendations.length === 0
      ? 0
      : Math.round(
          recommendations.reduce(
            (total, item) => total + item.sustainabilityScore,
            0
          ) / recommendations.length
        );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>Architect plan input</Text>
          <Text style={styles.title}>Choose greener materials by house part.</Text>
          <Text style={styles.subtitle}>
            Add the project plan, select the areas being specified, and compare
            lower-impact substitutes with stats and sourcing links.
          </Text>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Project Plan</Text>
          <TextInput
            value={plan}
            onChangeText={setPlan}
            placeholder="Paste or describe the architectural plan, rooms, usual materials, climate, budget, and location."
            placeholderTextColor={colors.textMuted}
            style={styles.planInput}
            multiline
          />

          <Text style={styles.smallLabel}>House parts</Text>
          <View style={styles.areaGrid}>
            {materialAreas.map((area) => {
              const active = selectedAreas.includes(area);
              return (
                <Pressable
                  key={area}
                  onPress={() => toggleArea(area)}
                  style={[styles.areaChip, active && styles.areaChipActive]}
                >
                  <Text
                    style={[
                      styles.areaChipText,
                      active && styles.areaChipTextActive,
                    ]}
                  >
                    {area}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <PrimaryButton label="Analyze Plan" onPress={runRecommendation} />
        </Card>

        {hasRun && (
          <>
            <View style={styles.kpiRow}>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiValue}>{recommendations.length}</Text>
                <Text style={styles.kpiLabel}>Recommendations</Text>
              </View>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiValue}>{averageScore}/100</Text>
                <Text style={styles.kpiLabel}>Avg. green score</Text>
              </View>
            </View>

            {recommendations.map((material) => (
              <RecommendationCard key={material.id} material={material} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RecommendationCard({ material }: { material: GreenMaterial }) {
  return (
    <Card>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleGroup}>
          <Text style={styles.area}>{material.area}</Text>
          <Text style={styles.materialName}>{material.name}</Text>
          <Text style={styles.usual}>
            Alternative to {material.usualMaterial}
          </Text>
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>{material.sustainabilityScore}</Text>
        </View>
      </View>

      <Text style={styles.fit}>{material.fit}</Text>

      <View style={styles.statsGrid}>
        {material.stats.map((stat) => (
          <View key={stat.label} style={styles.statBox}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="leaf-outline" size={16} color="#2F4F3E" />
        <Text style={styles.detailText}>Carbon: {material.embodiedCarbon}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="repeat-outline" size={16} color="#2F4F3E" />
        <Text style={styles.detailText}>
          Recycled / renewable: {material.recycledContent}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={16} color="#2F4F3E" />
        <Text style={styles.detailText}>Expected life: {material.lifespan}</Text>
      </View>

      <View style={styles.badgeRow}>
        {material.certifications.map((certification) => (
          <View key={certification} style={styles.badge}>
            <Text style={styles.badgeText}>{certification}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.tradeoff}>{material.tradeoffs}</Text>

      <View style={styles.shopLinks}>
        {material.shop.slice(0, 2).map((link) => (
          <Pressable
            key={link.url}
            onPress={() => Linking.openURL(link.url)}
            style={styles.shopButton}
          >
            <Ionicons name="open-outline" size={16} color="#2F4F3E" />
            <Text style={styles.shopButtonText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>
    </Card>
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
    paddingBottom: 96,
  },
  intro: {
    marginBottom: 18,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  subtitle: {
    color: "#DDE5DA",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  planInput: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 116,
    textAlignVertical: "top",
    lineHeight: 20,
    marginBottom: 14,
  },
  smallLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  areaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  areaChip: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D4DDD2",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.surfaceSoft,
  },
  areaChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  areaChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  areaChipTextActive: {
    color: "#2F4F3E",
  },
  kpiRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
  },
  kpiValue: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "800",
  },
  kpiLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  cardTitleGroup: {
    flex: 1,
  },
  area: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  materialName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },
  usual: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  scorePill: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    color: "#2F4F3E",
    fontSize: 18,
    fontWeight: "800",
  },
  fit: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 8,
    padding: 10,
    minHeight: 72,
    justifyContent: "center",
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 7,
  },
  detailText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  badge: {
    backgroundColor: "#E2EBDD",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#2F4F3E",
    fontSize: 11,
    fontWeight: "700",
  },
  tradeoff: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
  },
  shopLinks: {
    gap: 8,
    marginTop: 14,
  },
  shopButton: {
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CAD8C8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 10,
  },
  shopButtonText: {
    color: "#2F4F3E",
    fontSize: 13,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "center",
  },
});
