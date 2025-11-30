import { StyleSheet, Text, View } from "react-native";
import type { TransactionRow } from "../db/queries";
import { formatDate } from "../utils/date";

export function ExpenseCard({ transaction }: { transaction: TransactionRow }) {
  const isIncome = transaction.type === "income";
  const color = isIncome ? "#4ade80" : "#f97373";

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>
          {transaction.category_name || "Uncategorized"}
        </Text>

        {transaction.description ? (
          <Text style={styles.desc}>{transaction.description}</Text>
        ) : null}

        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>

      <Text style={[styles.amount, { color }]}>
        {isIncome ? "+" : "-"}€{transaction.amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151b32",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontWeight: "600", fontSize: 15 },
  desc: { color: "#aaa", fontSize: 12, marginTop: 2 },
  date: { color: "#777", fontSize: 11, marginTop: 4 },
  amount: { fontSize: 16, fontWeight: "bold" },
});
