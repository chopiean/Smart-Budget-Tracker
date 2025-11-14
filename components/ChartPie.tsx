import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Props = {
  data: { name: string; value: number }[];
};

export function ChartPie({ data }: Props) {
  if (!data || data.length === 0) {
    return <Text style={styles.empty}>No data</Text>;
  }

  const pieData = data.map((item, index) => ({
    name: item.name,
    population: item.value,
    color: COLORS[index % COLORS.length],
    legendFontColor: "#e5f9ff",
    legendFontSize: 12,
  }));

  return (
    <View>
      <PieChart
        data={pieData}
        width={screenWidth - 32}
        height={240}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="16"
        chartConfig={{
          color: () => "#4ade80",
        }}
      />
    </View>
  );
}

const COLORS = [
  "#4ade80", // green
  "#60a5fa", // blue
  "#f472b6", // pink
  "#facc15", // yellow
  "#fb7185", // red
  "#a78bfa", // purple
];

const styles = StyleSheet.create({
  empty: { color: "#ccc", textAlign: "center", marginVertical: 20 },
});
