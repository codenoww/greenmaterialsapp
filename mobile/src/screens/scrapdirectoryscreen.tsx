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
import { findScrapPartners } from "../data/greenDirectory";

export default function ScrapDirectoryScreen() {
  const [location, setLocation] = useState("Bengaluru");
  const [item, setItem] = useState("wood furniture");
  const [searched, setSearched] = useState(true);

  const partners = useMemo(
    () => (searched ? findScrapPartners(location, item) : []),
    [item, location, searched]
  );

  function handleSearch() {
    setSearched(true);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>Scrap and salvage directory</Text>
          <Text style={styles.title}>Discard less. Recover more.</Text>
          <Text style={styles.subtitle}>
            Enter the project location and item to find nearby recycling,
            scrapyard, donation, or resale options.
          </Text>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Find a Destination</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <View style={styles.inputShell}>
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.textMuted}
              />
              <TextInput
                value={location}
                onChangeText={(value) => {
                  setLocation(value);
                  setSearched(false);
                }}
                placeholder="City, neighborhood, or ZIP"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Material or furniture</Text>
            <View style={styles.inputShell}>
              <Ionicons
                name="cube-outline"
                size={18}
                color={colors.textMuted}
              />
              <TextInput
                value={item}
                onChangeText={(value) => {
                  setItem(value);
                  setSearched(false);
                }}
                placeholder="wood, metal, sofa, doors, paint..."
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </View>
          </View>

          <PrimaryButton label="Find Places" onPress={handleSearch} />
        </Card>

        {searched && (
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>{partners.length} matches</Text>
            <Text style={styles.resultMeta}>Sorted by estimated distance</Text>
          </View>
        )}

        {partners.map((partner) => (
          <Card key={partner.id}>
            <View style={styles.partnerHeader}>
              <View style={styles.typePill}>
                <Text style={styles.typeText}>{partner.type}</Text>
              </View>
              <Text style={styles.distance}>{partner.distanceKm} km</Text>
            </View>

            <Text style={styles.partnerName}>{partner.name}</Text>
            <Text style={styles.city}>{partner.city}</Text>
            <Text style={styles.note}>{partner.note}</Text>

            <View style={styles.acceptsRow}>
              {partner.accepts.slice(0, 5).map((accepted) => (
                <View key={accepted} style={styles.acceptsChip}>
                  <Text style={styles.acceptsText}>{accepted}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={() => Linking.openURL(partner.url)}
                style={styles.actionButton}
              >
                <Ionicons name="open-outline" size={16} color="#2F4F3E" />
                <Text style={styles.actionText}>Open listing</Text>
              </Pressable>
              <View style={styles.contactBox}>
                <Text style={styles.contactLabel}>Contact</Text>
                <Text style={styles.contactText}>{partner.contact}</Text>
              </View>
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
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  inputShell: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  resultMeta: {
    color: "#DDE5DA",
    fontSize: 12,
  },
  partnerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  typePill: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  typeText: {
    color: "#2F4F3E",
    fontSize: 12,
    fontWeight: "800",
  },
  distance: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "800",
  },
  partnerName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  city: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  note: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  acceptsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  acceptsChip: {
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  acceptsText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "700",
  },
  actions: {
    marginTop: 14,
    gap: 10,
  },
  actionButton: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: "#E4ECDF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionText: {
    color: "#2F4F3E",
    fontSize: 13,
    fontWeight: "800",
  },
  contactBox: {
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    padding: 10,
  },
  contactLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  contactText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3,
  },
});
