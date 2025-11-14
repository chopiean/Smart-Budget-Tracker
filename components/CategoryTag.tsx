import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  color?: string;
};

export function CategoryTag({ name, color }: Props) {
  return (
    <View style={[styles.chip, color ? { backgroundColor: color } : null]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#1f2933",
    alignSelf: "flex-start",
  },
  text: {
    color: "#e5f9ff",
    fontSize: 12,
    fontWeight: "500",
  },
});
