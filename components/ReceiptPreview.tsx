import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  uri?: string | null;
  total?: number | null;
  rawText?: string | null;
};

export function ReceiptPreview({ uri, total, rawText }: Props) {
  if (!uri && !rawText) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No receipt captured yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : null}

      <View style={styles.info}>
        {typeof total === "number" ? (
          <Text style={styles.total}>Detected Total: €{total.toFixed(2)}</Text>
        ) : null}
        {rawText ? (
          <Text style={styles.text} numberOfLines={4}>
            {rawText}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { color: "#94a3b8" },
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
    backgroundColor: "#020617",
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 10,
  },
  total: {
    color: "#4ade80",
    fontWeight: "600",
    marginBottom: 4,
  },
  text: {
    color: "#cbd5f5",
    fontSize: 12,
  },
});
