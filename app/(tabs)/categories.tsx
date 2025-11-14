import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getCategories } from "../../db/queries";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#aaa" }}>No categories yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1020", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 12 },
  row: {
    backgroundColor: "#151b32",
    padding: 14,
    borderRadius: 10,
    marginVertical: 4,
  },
  name: { color: "#fff", fontSize: 16 },
});
