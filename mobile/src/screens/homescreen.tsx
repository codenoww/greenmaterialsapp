import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { colors } from "../theme/colors";
import { Card } from "../components/Card";
import { ParallaxHero } from "../components/ParallaxHero";

const HERO_HEIGHT = 520;

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<any>(null);
  const lastSnapRef = useRef<"top" | "content" | null>(null);
  const [darkStatus, setDarkStatus] = useState(false);

  /* ANDROID EDGE-TO-EDGE */
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }
  }, []);

  /* SNAP + HAPTICS */
  const handleSnap = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y < HERO_HEIGHT * 0.5) {
      if (lastSnapRef.current !== "top") {
        Haptics.impactAsync(
          Haptics.ImpactFeedbackStyle.Light
        );
        lastSnapRef.current = "top";
      }
      scrollRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    } else if (y < HERO_HEIGHT) {
      if (lastSnapRef.current !== "content") {
        Haptics.impactAsync(
          Haptics.ImpactFeedbackStyle.Light
        );
        lastSnapRef.current = "content";
      }
      scrollRef.current.scrollTo({
        y: HERO_HEIGHT,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={Platform.OS === "android" ? [] : ["top"]}
    >
      {/* STATUS BAR */}
      <StatusBar
        translucent={Platform.OS === "android"}
        backgroundColor="transparent"
        barStyle={
          darkStatus ? "dark-content" : "light-content"
        }
        animated
      />

      <Animated.ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleSnap}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: (event: any) => {
              const y =
                event.nativeEvent.contentOffset.y;
              setDarkStatus(y > HERO_HEIGHT - 120);

              if (y < 10 || y > HERO_HEIGHT + 10) {
                lastSnapRef.current = null;
              }
            },
          }
        )}
      >
        {/* 🌴 HERO (REUSABLE COMPONENT) */}
        <ParallaxHero
          scrollY={scrollY}
          height={HERO_HEIGHT}
          image={require("../../assets/images/image.png")}

          title={["Build Better.", "Build Green."]}
          subtitle="Sustainable materials for low-carbon buildings."
        />

        {/* 🌿 HOME CONTENT */}
        <View style={styles.content}>
          <View style={styles.kpiRow}>
            <Card>
              <Text style={styles.kpiValue}>12.4t</Text>
              <Text style={styles.kpiLabel}>
                CO₂ Saved
              </Text>
            </Card>

            <Card>
              <Text style={styles.kpiValue}>18</Text>
              <Text style={styles.kpiLabel}>
                LEED Points
              </Text>
            </Card>
          </View>

          <Card>
            <Text style={styles.sectionTitle}>
              Why Green Materials?
            </Text>
            <Text style={styles.bodyText}>
              Selecting low-carbon and certified materials
              reduces environmental impact while improving
              building performance.
            </Text>
          </Card>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? 28 : 20,
  },

  kpiRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  kpiLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
  },
});
