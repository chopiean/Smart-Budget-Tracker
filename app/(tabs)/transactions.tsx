import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ExpenseCard } from "../../components/ExpenseCard";
import { useTransactions } from "../../hooks/useTransactions";

export default function TransactionsScreen() {
  const { transactions, refresh } = useTransactions();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  // Filter only current month transactions
  const currentMonthTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const today = new Date();

    return (
      txDate.getMonth() === today.getMonth() &&
      txDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Transactions</Text>

        <FlatList
          data={currentMonthTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 4 }}>
              <ExpenseCard transaction={item} />
            </View>
          )}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No transactions this month</Text>

              <Text style={styles.emptySub}>
                Add expenses or income to track your monthly budget.
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
    marginBottom: 20,
    textAlign: "center",
  },
  emptyBox: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyText: {
    color: "#9da7c2",
    fontSize: 16,
    marginBottom: 6,
  },
  emptySub: {
    color: "#4ade8055",
    fontSize: 14,
    textAlign: "center",
  },
});
