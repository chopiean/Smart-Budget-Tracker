import GlassButton from "@/components/GlassButton";
import GlassCard from "@/components/GlassCard";
import Screen from "@/components/Screen";
import { colors, spacing } from "@/constants/theme";
import { getTransactions, type Transaction } from "@/db/transactions";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getTransactions();
    setTransactions(data);

    let income = 0;
    let expense = 0;

    data.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  }

  const totalBalance = totalIncome - totalExpense;

  return (
    <Screen>
      {/* Title */}
      <Text style={styles.title}>Smart Budget Tracker</Text>

      {/* Balance */}
      <GlassCard style={styles.balanceCard}>
        <Text style={styles.label}>Total Balance</Text>
        <Text style={styles.balance}>€{totalBalance.toFixed(2)}</Text>
        <Text style={styles.sub}>
          Income: €{totalIncome.toFixed(2)} | Expenses: €
          {totalExpense.toFixed(2)}
        </Text>
      </GlassCard>

      {/* This Month Spending */}
      <Text style={styles.sectionTitle}>This Month Spending</Text>
      <GlassCard style={styles.centerCard}>
        <Text style={styles.muted}>
          {totalExpense === 0 ? "No data" : `€${totalExpense.toFixed(2)}`}
        </Text>
      </GlassCard>

      {/* Buttons */}
      <View style={styles.row}>
        <GlassButton
          label="Add Expense"
          variant="blue"
          style={{ flex: 1, marginRight: 6 }}
          onPress={() => router.push("/add-expense")}
        />
        <GlassButton
          label="Scan Receipt"
          variant="purple"
          style={{ flex: 1, marginLeft: 6 }}
          onPress={() => router.push("/scan-receipt")}
        />
      </View>

      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <GlassCard style={styles.centerCard}>
        {transactions.length === 0 ? (
          <Text style={styles.muted}>No transactions yet.</Text>
        ) : (
          <View>
            {transactions
              .slice(-3)
              .reverse()
              .map((t) => (
                <Text key={t.id} style={styles.muted}>
                  {t.type === "income" ? "➕" : "➖"} {t.description} – €
                  {t.amount.toFixed(2)}
                </Text>
              ))}
          </View>
        )}
      </GlassCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  balanceCard: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 4,
  },
  balance: {
    fontSize: 38,
    fontWeight: "700",
    color: colors.accentGreen,
  },
  sub: {
    marginTop: 4,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  centerCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  muted: { color: colors.textMuted, fontSize: 14 },
  row: {
    flexDirection: "row",
    marginBottom: spacing.xl,
  },
});
