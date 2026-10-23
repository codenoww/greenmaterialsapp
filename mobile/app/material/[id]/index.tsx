import { View, Text, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function MaterialOverview() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>
        Material Overview
      </Text>

      <Pressable
        style={{ marginTop: 16 }}
        onPress={() => router.push(`/material/${id}/leed`)}
      >
        <Text style={{ color: "#1e88e5" }}>View LEED Insights →</Text>
      </Pressable>

      <Pressable
        style={{ marginTop: 12 }}
        onPress={() => router.push(`/material/${id}/specsheet`)}
      >
        <Text style={{ color: "#1e88e5" }}>View Spec Sheet →</Text>
      </Pressable>
    </View>
  );
}
