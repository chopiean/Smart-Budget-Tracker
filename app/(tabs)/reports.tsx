import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChartBar } from "../../components/ChartBar";
import { ChartPie } from "../../components/ChartPie";
import { getMonthlyReports } from "../../db/reports";

type BarItem = {
  category: string;
  total: number;
};

type PieItem = {
  name: string;
  value: number;
};

export default function ReportsScreen() {
  const [categoryTotals, setCategoryTotals] = useState<PieItem[]>([]);
  const [monthlyExpenseTrend, setMonthlyExpenseTrend] = useState<BarItem[]>([]);
  const [monthlyIncomeTrend, setMonthlyIncomeTrend] = useState<BarItem[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  async function loadReports() {
    try {
      const reports = await getMonthlyReports();

      const today = new Date();
      const currentMonth = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}`;

      const currentReport = reports.find((r) => r.month === currentMonth);

      if (!currentReport) {
        setMonthlyExpenseTrend([]);
        setMonthlyIncomeTrend([]);
        setCategoryTotals([]);
        setSummary({
          totalIncome: 0,
          totalExpense: 0,
          netBalance: 0,
        });
        return;
      }

      const pieData = Object.entries(currentReport.byCategory).map(
        ([category, total]) => ({
          name: category,
          value: total,
        })
      );

      setMonthlyExpenseTrend([
        {
          category: currentMonth,
          total: currentReport.totalExpense,
        },
      ]);

      setMonthlyIncomeTrend([
        {
          category: currentMonth,
          total: currentReport.totalIncome,
        },
      ]);

      setCategoryTotals(pieData);

      setSummary({
        totalIncome: currentReport.totalIncome,
        totalExpense: currentReport.totalExpense,
        netBalance: currentReport.netBalance,
      });
    } catch (error) {
      console.error("Failed to load reports:", error);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Monthly Reports</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.incomeText}>
              € {summary.totalIncome.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Expense</Text>
            <Text style={styles.expenseText}>
              € {summary.totalExpense.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Totals by Category</Text>
          <ChartPie data={categoryTotals} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Monthly Income Trend</Text>
          <ChartBar data={monthlyIncomeTrend} />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Monthly Expense Trend</Text>
          <ChartBar data={monthlyExpenseTrend} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0b1020",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#161b2e",
    padding: 16,
    borderRadius: 18,
  },
  netCard: {
    backgroundColor: "#161b2e",
    padding: 16,
    borderRadius: 18,
    marginBottom: 24,
  },
  summaryLabel: {
    color: "#9da7c2",
    fontSize: 14,
    marginBottom: 8,
  },
  incomeText: {
    color: "#00e676",
    fontSize: 22,
    fontWeight: "700",
  },
  expenseText: {
    color: "#ff6b6b",
    fontSize: 22,
    fontWeight: "700",
  },
  balanceText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  section: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#161b2e",
    padding: 18,
    borderRadius: 18,
    marginBottom: 24,
  },
});
