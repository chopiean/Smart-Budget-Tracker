import { Link } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { ChartPie } from "../../components/ChartPie";
import { ExpenseCard } from "../../components/ExpenseCard";
import { useBudget } from "../../hooks/useBudget";
import { useTransactions } from "../../hooks/useTransactions";

export default function DashboardScreen() {
  const { totalBalance, totalIncome, totalExpense, byCategory } = useBudget();
  const { recentTransactions } = useTransactions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Budget Tracker</Text>

      {/* Balance summary */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceValue}>€{totalBalance.toFixed(2)}</Text>
        <Text style={styles.subText}>
          Income: €{totalIncome.toFixed(2)} | Expenses: €
          {totalExpense.toFixed(2)}
        </Text>
      </View>

      {/* Spending chart */}
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.sectionTitle}>This Month Spending</Text>
        <ChartPie data={byCategory} />
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <Link href="/add-expense" asChild>
          <Button title="Add Expense" />
        </Link>
        <Link href="/scan-receipt" asChild>
          <Button title="Scan Receipt" />
        </Link>
      </View>

      {/* Recent transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseCard transaction={item} />}
        ListEmptyComponent={
          <Text style={{ color: "#aaa" }}>No transactions yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0b1020" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 12 },
  balanceCard: {
    backgroundColor: "#151b32",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  balanceLabel: { color: "#ccc", fontSize: 14 },
  balanceValue: { color: "#4ade80", fontSize: 26, fontWeight: "bold" },
  subText: { color: "#aaa", marginTop: 4 },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
});
