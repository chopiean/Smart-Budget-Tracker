import { StyleSheet, Text, View } from "react-native";
import { TransactionRow } from "../db/queries";
import { formatDate } from "../utils/date";
import { formatCurrency } from "../utils/format";

type Props = {
  transaction: TransactionRow;
};

export function IncomeCard({ transaction }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>
          {transaction.category_name || "Income"}
        </Text>
        {transaction.description ? (
          <Text style={styles.desc}>{transaction.description}</Text>
        ) : null}
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>

      <Text style={styles.amount}>+{formatCurrency(transaction.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#102532",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { color: "#e5f9ff", fontWeight: "600" },
  desc: { color: "#a5b8c6", fontSize: 12 },
  date: { color: "#6b7b8c", fontSize: 11, marginTop: 4 },
  amount: {
    color: "#4ade80",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
});
