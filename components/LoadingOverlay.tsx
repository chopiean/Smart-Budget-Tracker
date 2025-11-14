import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  message?: string;
};

export function LoadingOverlay({ visible, message }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.backdrop}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#4ade80" />
        {message ? <Text style={styles.text}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.85)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  box: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#020617",
    alignItems: "center",
  },
  text: {
    marginTop: 8,
    color: "#e5f9ff",
  },
});
