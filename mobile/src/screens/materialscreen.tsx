import React, { useEffect, useMemo, useState } from "react";
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
import { colors } from "../theme/colors";
import { GreenMaterial, greenMaterials } from "../data/greenDirectory";
import {
  fetchMaterialDatabase,
  MaterialDatabaseRecord,
} from "../api/materialDatabase.api";

type DirectoryMaterial = {
  id: string;
  area: string;
  name: string;
  category: string;
  usualMaterial: string;
  sustainabilityScore: number;
  carbonSaving: string;
  embodiedCarbon: string;
  recycledContent: string;
  lifespan: string;
  certifications: string[];
  stats: { label: string; value: string }[];
  fit: string;
  tradeoffs: string;
  shop: { label: string; url: string; region: string }[];
  sourceNote: string;
  metrics?: MaterialDatabaseRecord["metrics"];
};

export default function MaterialsScreen() {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [databaseMode, setDatabaseMode] = useState("Local frontend fallback");
  const [databaseMaterials, setDatabaseMaterials] = useState<DirectoryMaterial[]>(
    () => greenMaterials.map(mapGreenMaterial)
  );

  useEffect(() => {
    let cancelled = false;

    async function loadDatabase() {
      try {
        const response = await fetchMaterialDatabase();

        if (!cancelled) {
          setDatabaseMaterials(response.items.map(mapDatabaseRecord));
          setDatabaseMode(
            response.mode === "verified_api_with_cache"
              ? "OpenEPD/EC3 verified API + cache"
              : "Backend local cache fallback"
          );
        }
      } catch {
        if (!cancelled) {
          setDatabaseMode("Local frontend fallback");
        }
      }
    }

    loadDatabase();

    return () => {
      cancelled = true;
    };
  }, []);

  const materials = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return databaseMaterials;
    }

    return databaseMaterials.filter((material) => {
      const searchable = [
        material.name,
        material.area,
        material.category,
        material.usualMaterial,
        material.fit,
        material.certifications.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [databaseMaterials, query]);

  function toggleCard(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchShell}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search paint, brick, flooring, recycled, LEED..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.resultText}>
          {materials.length} materials in the green database | {databaseMode}
        </Text>

        {materials.map((material) => (
          <MaterialDirectoryCard
            key={material.id}
            material={material}
            expanded={expandedId === material.id}
            onPress={() => toggleCard(material.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MaterialDirectoryCard({
  material,
  expanded,
  onPress,
}: {
  material: DirectoryMaterial;
  expanded: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.cardText}>
            <Text style={styles.area}>{material.area}</Text>
            <Text style={styles.name}>{material.name}</Text>
            <Text style={styles.meta}>
              {material.category} | Carbon: {material.carbonSaving}
            </Text>
            <Text style={styles.meta}>Alternative to {material.usualMaterial}</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.score}>{material.sustainabilityScore}</Text>
            <Text style={styles.scoreLabel}>score</Text>
          </View>
        </View>

        {expanded && (
          <View style={styles.expanded}>
            <Text style={styles.sectionTitle}>Spec Sheet</Text>
            <SpecRow label="Best use" value={material.fit} />
            <SpecRow label="Embodied carbon" value={material.embodiedCarbon} />
            <SpecRow label="Recycled / renewable" value={material.recycledContent} />
            <SpecRow label="Expected life" value={material.lifespan} />
            <SpecRow label="Data source" value={material.sourceNote} />

            <Text style={styles.sectionTitle}>Green Info</Text>
            <View style={styles.statsGrid}>
              {material.stats.map((stat) => (
                <View key={stat.label} style={styles.statBox}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {material.metrics && (
              <>
                <Text style={styles.sectionTitle}>Carbon Cost Model</Text>
                <View style={styles.metricsGrid}>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricValue}>
                      {material.metrics.carbonIntensity.value}
                    </Text>
                    <Text style={styles.metricLabel}>
                      {material.metrics.carbonIntensity.unit}
                    </Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricValue}>
                      {material.metrics.carbonSavingsPercent}%
                    </Text>
                    <Text style={styles.metricLabel}>vs baseline</Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricValue}>
                      {material.metrics.estimatedProjectImpact.savingsKgCO2e}
                    </Text>
                    <Text style={styles.metricLabel}>kgCO2e saved</Text>
                  </View>
                </View>

                <SpecRow
                  label="Default quantity"
                  value={`${material.metrics.defaultQuantity.value} ${material.metrics.defaultQuantity.unit} - ${material.metrics.defaultQuantity.note}`}
                />
                <SpecRow
                  label="Baseline"
                  value={`${material.metrics.baselineCarbonIntensity.material}: ${material.metrics.baselineCarbonIntensity.value} ${material.metrics.baselineCarbonIntensity.unit}`}
                />
                <SpecRow
                  label="Relative cost"
                  value={`${material.metrics.costCarbonModel.relativeCost} - ${material.metrics.costCarbonModel.carbonValueNote}`}
                />

                <View style={styles.breakdownList}>
                  {material.metrics.impactBreakdown.map((item) => (
                    <View key={item.stage} style={styles.breakdownRow}>
                      <Text style={styles.breakdownStage}>{item.stage}</Text>
                      <View style={styles.breakdownTrack}>
                        <View
                          style={[
                            styles.breakdownFill,
                            { width: `${item.percent}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.breakdownPercent}>{item.percent}%</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            <View style={styles.badgeRow}>
              {material.certifications.map((certification) => (
                <View key={certification} style={styles.badge}>
                  <Text style={styles.badgeText}>{certification}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.tradeoff}>{material.tradeoffs}</Text>

            <View style={styles.shopLinks}>
              {material.shop.map((shop) => (
                <Pressable
                  key={shop.url}
                  onPress={() => Linking.openURL(shop.url)}
                  style={styles.shopButton}
                >
                  <Ionicons name="open-outline" size={16} color="#2F4F3E" />
                  <Text style={styles.shopButtonText}>
                    {shop.label} ({shop.region})
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </Card>
    </Pressable>
  );
}

function mapGreenMaterial(material: GreenMaterial): DirectoryMaterial {
  return {
    ...material,
    sourceNote: "Curated frontend fallback",
  };
}

function mapDatabaseRecord(record: MaterialDatabaseRecord): DirectoryMaterial {
  return {
    id: record.id,
    area: record.section,
    name: record.name,
    category: record.category,
    usualMaterial: record.usualMaterial,
    sustainabilityScore: record.sustainabilityScore,
    carbonSaving: record.gwpA1A3
      ? `${record.gwpA1A3.value} ${record.gwpA1A3.unit}`
      : "See source record",
    embodiedCarbon: record.gwpA1A3
      ? `${record.gwpA1A3.value} ${record.gwpA1A3.unit} (${record.gwpA1A3.source})`
      : "Product EPD or fallback factor not available",
    recycledContent: record.recycledContent ?? "Not reported",
    lifespan: record.lifespan ?? "Not reported",
    certifications: record.certifications,
    stats: [
      {
        label: "Low VOC",
        value: record.healthAndCircularity.lowVoc ? "Yes" : "Check",
      },
      {
        label: "Circularity",
        value: record.healthAndCircularity.reusePotential,
      },
      {
        label: "Source",
        value: record.sourceIds[0] ?? "cache",
      },
    ],
    fit: record.specSheet.application,
    tradeoffs: record.specSheet.tradeoffs,
    shop: record.shopLinks,
    sourceNote: record.sourceIds.join(", "),
    metrics: record.metrics,
  };
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
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
  searchShell: {
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  resultText: {
    color: "#DDE5DA",
    fontSize: 13,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  cardText: {
    flex: 1,
  },
  area: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  scoreBox: {
    width: 58,
    minHeight: 58,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    color: "#2F4F3E",
    fontSize: 20,
    fontWeight: "900",
  },
  scoreLabel: {
    color: "#2F4F3E",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  expanded: {
    borderTopWidth: 1,
    borderTopColor: "#DCE5D8",
    marginTop: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 4,
  },
  specRow: {
    marginBottom: 10,
  },
  specLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  specValue: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
    justifyContent: "center",
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: "#E4ECDF",
    borderRadius: 8,
    padding: 10,
    minHeight: 76,
    justifyContent: "center",
  },
  metricValue: {
    color: "#2F4F3E",
    fontSize: 16,
    fontWeight: "900",
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 4,
  },
  breakdownList: {
    gap: 8,
    marginBottom: 14,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  breakdownStage: {
    width: 46,
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  breakdownTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DDE5D8",
    overflow: "hidden",
  },
  breakdownFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  breakdownPercent: {
    width: 38,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "right",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    borderRadius: 8,
    backgroundColor: "#E2EBDD",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#2F4F3E",
    fontSize: 11,
    fontWeight: "800",
  },
  tradeoff: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
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
    fontWeight: "800",
    flexShrink: 1,
    textAlign: "center",
  },
});
