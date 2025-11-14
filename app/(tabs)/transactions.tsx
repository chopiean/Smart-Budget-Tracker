import { FlatList, StyleSheet, Text, View } from "react-native";
import { ExpenseCard } from "../../components/ExpenseCard";
import { useTransactions } from "../../hooks/useTransactions";

export default function TransactionsScreen() {
  const { transactions } = useTransactions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseCard transaction={item} />}
        ListEmptyComponent={<Text style={{ color: "#ccc" }}>No data yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1020", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12 },
});
