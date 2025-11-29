import { BlurView } from "expo-blur";
import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { colors } from "../constants/theme";

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
}

export default function GlassCard({
  children,
  style,
  intensity = 35,
}: GlassCardProps) {
  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.card, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: "rgba(15,23,42,0.78)",
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: "hidden",
  },
});
