import GlassButton from "@/components/GlassButton";
import GlassCard from "@/components/GlassCard";
import Screen from "@/components/Screen";
import { colors, spacing } from "@/constants/theme";
import { getAllTransactions, type TransactionRow } from "@/db/queries";
import { getSettings } from "@/db/settings";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [currency, setCurrency] = useState("€");
  const [budgetLimit, setBudgetLimit] = useState(0);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    try {
      const [data, settings] = await Promise.all([
        getAllTransactions(),
        getSettings(),
      ]);

      setTransactions(data);

      let income = 0;
      let expense = 0;

      data.forEach((t) => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
      });

      setTotalIncome(income);
      setTotalExpense(expense);

      setCurrency(settings?.currency || "€");
      setBudgetLimit(settings?.budget_limit ?? 0);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }

  const totalBalance = totalIncome - totalExpense;
  const budgetUsedPercent =
    budgetLimit > 0 ? (totalExpense / budgetLimit) * 100 : 0;

  const isNearLimit =
    budgetLimit > 0 && budgetUsedPercent >= 80 && budgetUsedPercent < 100;

  const isOverLimit = budgetLimit > 0 && totalExpense > budgetLimit;

  return (
    <Screen>
      <Text style={styles.title}>Smart Budget Tracker</Text>

      <GlassCard style={styles.balanceCard}>
        <Text style={styles.label}>Total Balance</Text>
        <Text style={styles.balance}>
          {currency}
          {totalBalance.toFixed(2)}
        </Text>
        <Text style={styles.sub}>
          Income: {currency}
          {totalIncome.toFixed(2)} | Expenses: {currency}
          {totalExpense.toFixed(2)}
        </Text>
      </GlassCard>

      <Text style={styles.sectionTitle}>This Month Spending</Text>
      <GlassCard style={styles.centerCard}>
        <Text style={styles.muted}>
          {totalExpense === 0
            ? "No data"
            : `${currency}${totalExpense.toFixed(2)}`}
        </Text>

        {budgetLimit > 0 && (
          <>
            <Text style={styles.budgetText}>
              Budget: {currency}
              {budgetLimit.toFixed(2)} • Used {budgetUsedPercent.toFixed(1)}%
            </Text>

            <View style={styles.progressWrapper}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(budgetUsedPercent, 100)}%`,
                    backgroundColor: isOverLimit
                      ? "#ff6b6b"
                      : colors.accentGreen,
                  },
                ]}
              />
            </View>
          </>
        )}
      </GlassCard>

      {isNearLimit && (
        <GlassCard style={styles.warningCard}>
          <Text style={styles.warningText}>
            Warning: You are close to your monthly budget limit.
          </Text>
        </GlassCard>
      )}

      {isOverLimit && (
        <GlassCard style={styles.dangerCard}>
          <Text style={styles.dangerText}>
            Alert: You have exceeded your monthly budget limit.
          </Text>
        </GlassCard>
      )}

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

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <GlassCard style={styles.centerCard}>
        {transactions.length === 0 ? (
          <Text style={styles.muted}>No transactions yet.</Text>
        ) : (
          <View>
            {transactions.slice(0, 3).map((t) => (
              <Text key={t.id} style={styles.muted}>
                {t.type === "income" ? "➕" : "➖"}{" "}
                {t.description || t.category_name || "Transaction"} – {currency}
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
  muted: {
    color: colors.textMuted,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    marginBottom: spacing.xl,
  },
  budgetText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 8,
  },
  progressWrapper: {
    width: "100%",
    height: 10,
    backgroundColor: "#1f253b",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  warningCard: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "#facc15",
  },
  dangerCard: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  warningText: {
    color: "#facc15",
    fontSize: 14,
    fontWeight: "600",
  },
  dangerText: {
    color: "#ff6b6b",
    fontSize: 14,
    fontWeight: "600",
  },
});
