// components/ChartBar.tsx
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Props = {
  data: { category: string; total: number }[];
};

export function ChartBar({ data }: Props) {
  if (!data || data.length === 0) {
    return <Text style={styles.empty}>No data</Text>;
  }

  const labels = data.map((x) => x.category);
  const values = data.map((x) => x.total);

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={screenWidth - 32}
        height={260}
        showValuesOnTopOfBars={true}
        yAxisLabel="€"
        yAxisSuffix="" // <-- REQUIRED (FIX)
        chartConfig={{
          backgroundColor: "#0b1020",
          backgroundGradientFrom: "#0b1020",
          backgroundGradientTo: "#0b1020",
          decimalPlaces: 2,
          color: () => "#4ade80",
          labelColor: () => "#e5f9ff",
          barPercentage: 0.5,
        }}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  empty: { color: "#aaa", textAlign: "center", marginVertical: 20 },
});
