import { getAllTransactions, type TransactionRow } from "@/db/queries";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CategoryTotal = {
  category: string;
  total: number;
};
export default function CategoriesScreen() {
  const [categories, setCategories] = useState<CategoryTotal[]>([]);

  const load = async () => {
    try {
      const data = await getAllTransactions();

      const today = new Date();

      const currentMonthExpenses = data.filter((t) => {
        const txDate = new Date(t.date);

        return (
          t.type === "expense" &&
          txDate.getMonth() === today.getMonth() &&
          txDate.getFullYear() === today.getFullYear()
        );
      });

      const categoryMap: Record<string, number> = {};

      currentMonthExpenses.forEach((t) => {
        const category = t.category_name || "Other";
        categoryMap[category] = (categoryMap[category] || 0) + t.amount;
      });

      const result = Object.entries(categoryMap).map(([category, total]) => ({
        category,
        total,
      }));

      setCategories(result);
    } catch (error) {
      console.error("Failed to load categories", error);
      Alert.alert("Error", "Failed to load categories");
    }
  };
  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Category Spending</Text>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.category}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.category}</Text>
              <Text style={styles.amount}>€ {item.total.toFixed(2)}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No category spending yet</Text>
              <Text style={styles.emptySub}>
                Totals will appear when expense transactions are added.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0b1020",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#161b2e",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f253b",
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyBox: {
    marginTop: 80,
    alignItems: "center",
  },
  emptyText: {
    color: "#9da7c2",
    fontSize: 16,
    marginBottom: 4,
  },
  emptySub: {
    color: "#4ade8055",
    fontSize: 13,
  },
  amount: {
    color: "#00e676",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 6,
  },
});
