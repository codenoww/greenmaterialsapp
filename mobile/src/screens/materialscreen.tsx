import React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { AppHeader } from "../components/AppHeader";
import { Card } from "../components/Card";
import { colors } from "../theme/colors";

import {
  MaterialsListProvider,
  useMaterialsList,
} from "../context/MaterialListContext";

/**
 * Render-only content.
 * All data fetching & normalization lives in the provider.
 */
function MaterialsListContent() {
  const state = useMaterialsList();

  if (state.status === "loading") {
    return (
      <View style={styles.center}>
        <Text>Loading materials…</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={styles.center}>
        <Text>{state.error}</Text>
      </View>
    );
  }

  // 🔑 Discriminated-union narrowing (CRITICAL)
  if (state.status !== "ready") {
    return null;
  }

  if (state.materials.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No materials found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {state.materials.map((material) => (
        <Pressable
          key={material.id}
          onPress={() =>
            router.push(`/material/${material.id}`)
          }
        >
          <Card>
            <Text style={styles.name}>{material.name}</Text>
            <Text style={styles.meta}>
              {material.category} · Carbon:{" "}
              {material.carbonLevel}
            </Text>
            <Text style={styles.meta}>
              LEED Points: {material.leedPoints}
            </Text>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}

export default function MaterialsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />
      <MaterialsListProvider>
        <MaterialsListContent />
      </MaterialsListProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
useEffect(() => {
  fetch("http://YOUR_IP:3000/materials")
    .then((res) => res.text())
    .then((txt) => console.log("✅ DIRECT FETCH OK:", txt))
    .catch((err) => console.error("❌ DIRECT FETCH FAIL:", err));
}, []);
