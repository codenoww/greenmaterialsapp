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
import { colors } from "../theme/colors";
import { greenMaterials, materialAreas } from "../data/greenDirectory";

export default function ShopScreen() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<string>("All");

  const products = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return greenMaterials.filter((material) => {
      const areaMatch = area === "All" || material.area === area;
      const queryMatch =
        normalized.length === 0 ||
        material.name.toLowerCase().includes(normalized) ||
        material.category.toLowerCase().includes(normalized) ||
        material.usualMaterial.toLowerCase().includes(normalized);

      return areaMatch && queryMatch;
    });
  }, [area, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>Green product marketplace</Text>
          <Text style={styles.title}>Shop recommended alternatives.</Text>
          <Text style={styles.subtitle}>
            Browse product sources connected to each recommendation, then open
            supplier pages directly.
          </Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search concrete, paint, bamboo..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {["All", ...materialAreas].map((item) => {
            const active = area === item;
            return (
              <Pressable
                key={item}
                onPress={() => setArea(item)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {products.map((material) => (
          <Card key={material.id}>
            <View style={styles.productHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="leaf-outline" color="#2F4F3E" size={22} />
              </View>
              <View style={styles.productText}>
                <Text style={styles.area}>{material.area}</Text>
                <Text style={styles.name}>{material.name}</Text>
                <Text style={styles.meta}>
                  Score {material.sustainabilityScore}/100 |{" "}
                  {material.carbonSaving}
                </Text>
              </View>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specBox}>
                <Text style={styles.specValue}>{material.recycledContent}</Text>
                <Text style={styles.specLabel}>Recycled / renewable</Text>
              </View>
              <View style={styles.specBox}>
                <Text style={styles.specValue}>{material.lifespan}</Text>
                <Text style={styles.specLabel}>Typical lifespan</Text>
              </View>
            </View>

            <View style={styles.links}>
              {material.shop.map((shop) => (
                <Pressable
                  key={shop.url}
                  onPress={() => Linking.openURL(shop.url)}
                  style={styles.linkButton}
                >
                  <View style={styles.linkTextWrap}>
                    <Text style={styles.linkTitle}>{shop.label}</Text>
                    <Text style={styles.linkRegion}>{shop.region}</Text>
                  </View>
                  <Ionicons name="open-outline" color="#2F4F3E" size={18} />
                </Pressable>
              ))}
            </View>
          </Card>
        ))}
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
    paddingBottom: 96,
  },
  intro: {
    marginBottom: 18,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
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
  searchBar: {
    minHeight: 48,
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
  filterRow: {
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "#59545B",
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: "#E9EEE7",
    fontSize: 12,
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#2F4F3E",
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  productText: {
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
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  specRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  specBox: {
    flex: 1,
    backgroundColor: colors.surfaceSoft,
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
  },
  specValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "800",
  },
  specLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },
  links: {
    gap: 8,
    marginTop: 14,
  },
  linkButton: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: "#E4ECDF",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
  },
  linkTextWrap: {
    flex: 1,
  },
  linkTitle: {
    color: "#2F4F3E",
    fontSize: 13,
    fontWeight: "800",
  },
  linkRegion: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
});
