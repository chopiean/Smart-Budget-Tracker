import { StyleSheet, Text, View } from "react-native";
import { ChartBar } from "../../components/ChartBar";
import { ChartPie } from "../../components/ChartPie";
import { useBudget } from "../../hooks/useBudget";

export default function ReportsScreen() {
  const { byCategory, monthlyTrend } = useBudget();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      <Text style={styles.section}>Spending by Category</Text>
      <ChartPie data={byCategory} />

      <Text style={styles.section}>Monthly Expense Trend</Text>
      <ChartBar data={monthlyTrend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1020", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  section: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
});
