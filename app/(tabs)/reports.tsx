import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChartBar } from "../../components/ChartBar";
import { ChartPie } from "../../components/ChartPie";
import { getMonthlyReports } from "../../db/reports";
import { useBudget } from "../../hooks/useBudget";

export default function ReportsScreen() {
  const { byCategory } = useBudget();

  const [monthlyTrend, setMonthlyTrend] = useState<
    { category: string; total: number }[]
  >([]);

  async function loadReports() {
    const reports = await getMonthlyReports();

    const trend = reports.map((r) => ({
      category: r.month,
      total: r.totalExpense,
    }));

    setMonthlyTrend(trend);
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
        <Text style={styles.title}>Reports</Text>

        {/* CATEGORY PIE */}
        <View style={styles.card}>
          <Text style={styles.section}>Totals by Category</Text>
          <ChartPie data={byCategory} />
        </View>

        {/* MONTHLY BAR */}
        <View style={styles.card}>
          <Text style={styles.section}>Monthly Expense Trend</Text>
          <ChartBar data={monthlyTrend} />
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
