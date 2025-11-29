import GlassButton from "@/components/GlassButton";
import GlassCard from "@/components/GlassCard";
import Screen from "@/components/Screen";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../constants/theme";

export default function DashboardScreen() {
  return (
    <Screen>
      {/* Title */}
      <Text style={styles.title}>Smart Budget Tracker</Text>

      {/* Balance */}
      <GlassCard style={styles.balanceCard}>
        <Text style={styles.label}>Total Balance</Text>
        <Text style={styles.balance}>€0.00</Text>
        <Text style={styles.sub}>Income: €0.00 | Expenses: €0.00</Text>
      </GlassCard>

      {/* This Month Spending */}
      <Text style={styles.sectionTitle}>This Month Spending</Text>
      <GlassCard style={styles.centerCard}>
        <Text style={styles.muted}>No data</Text>
      </GlassCard>

      {/* Buttons */}
      <View style={styles.row}>
        <GlassButton
          label="Add Expense"
          variant="blue"
          style={{ flex: 1, marginRight: 6 }}
          // onPress={() => navigation.navigate("AddExpense")} // if you have it
        />
        <GlassButton
          label="Scan Receipt"
          variant="purple"
          style={{ flex: 1, marginLeft: 6 }}
          // onPress={() => navigation.navigate("Scan")}
        />
      </View>

      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <GlassCard style={styles.centerCard}>
        <Text style={styles.muted}>No transactions yet.</Text>
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
  muted: { color: colors.textMuted },
  row: {
    flexDirection: "row",
    marginBottom: spacing.xl,
  },
});
