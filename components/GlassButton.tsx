import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/theme";

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "blue" | "purple" | "green" | "ghost";
};

export default function GlassButton({
  label,
  onPress,
  style,
  textStyle,
  variant = "blue",
}: Props) {
  const bgMap: Record<string, string> = {
    blue: "rgba(59,130,246,0.35)",
    purple: "rgba(168,85,247,0.35)",
    green: "rgba(34,197,94,0.35)",
    ghost: "transparent",
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgMap[variant] },
        style,
        variant === "ghost" && styles.ghostBorder,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostBorder: {
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.6)",
  },
  label: {
    color: colors.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
});
