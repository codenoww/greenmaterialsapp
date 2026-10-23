import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import { PrimaryButton } from "./PrimaryButton";

type Props = {
  scrollY: Animated.Value;
  height: number;
  image: any;
  title: string[];
  subtitle: string;
};

export function ParallaxHero({
  scrollY,
  height,
  image,
  title,
  subtitle,
}: Props) {
  /* PARALLAX */
  const translateY = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height * 0.3],
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange: [-height, 0],
    outputRange: [1.4, 1],
    extrapolate: "clamp",
  });

  /* FADE */
  const contentOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.35],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  /* DOTS */
  const heroDotOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.5],
    outputRange: [1, 0.3],
    extrapolate: "clamp",
  });

  const contentDotOpacity = scrollY.interpolate({
    inputRange: [height * 0.4, height],
    outputRange: [0.3, 1],
    extrapolate: "clamp",
  });

  const heroDotScale = scrollY.interpolate({
    inputRange: [0, height * 0.5],
    outputRange: [1.2, 1],
    extrapolate: "clamp",
  });

  const contentDotScale = scrollY.interpolate({
    inputRange: [height * 0.4, height],
    outputRange: [1, 1.2],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[
          styles.hero,
          { height, transform: [{ translateY }, { scale }] },
        ]}
      >
        <ImageBackground
          source={image}
          style={styles.image}
          resizeMode="cover"
        >
          {/* GRADIENTS */}
          <View style={styles.gradientTop} />
          <View style={styles.gradientBottom} />

          {/* CONTENT */}
          <Animated.View
            style={[
              styles.content,
              { opacity: contentOpacity },
            ]}
          >
            {title.map((line) => (
              <Text key={line} style={styles.title}>
                {line}
              </Text>
            ))}

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>

            <PrimaryButton
              label="Explore Materials"
              onPress={() => {}}
            />
          </Animated.View>

          {/* DOTS */}
          <View style={styles.dots}>
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: heroDotOpacity,
                  transform: [{ scale: heroDotScale }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: contentDotOpacity,
                  transform: [{ scale: contentDotScale }],
                },
              ]}
            />
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  hero: {
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  /* GRADIENTS */
  gradientTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  /* CONTENT */
  content: {
    padding: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    marginVertical: 14,
    lineHeight: 22,
  },

  /* DOTS */
  dots: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
});
