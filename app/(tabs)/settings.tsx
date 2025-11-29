import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getSettings, saveSettings } from "../../db/settings";

export default function SettingsScreen() {
  const [currency, setCurrency] = useState("€");
  const [dailyReminder, setDailyReminder] = useState(false);
  const [budgetLimit, setBudgetLimit] = useState("");

  useEffect(() => {
    (async () => {
      const s = await getSettings();
      if (s) {
        setCurrency(s.currency || "€");
        setDailyReminder(Boolean(s.daily_reminder));
        setBudgetLimit(s.budget_limit ? String(s.budget_limit) : "0");
      }
    })();
  }, []);

  const handleSave = async () => {
    const limit = parseFloat(budgetLimit) || 0;
    await saveSettings({
      currency,
      daily_reminder: dailyReminder,
      budget_limit: limit,
    });
    Alert.alert("Settings saved");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Currency Symbol</Text>
          <TextInput
            value={currency}
            onChangeText={setCurrency}
            style={styles.input}
            placeholder="€"
            placeholderTextColor="#555"
          />

          <View style={styles.row}>
            <Text style={styles.label}>Daily Reminder</Text>
            <Switch
              value={dailyReminder}
              onValueChange={setDailyReminder}
              trackColor={{ false: "#555", true: "#00e67655" }}
              thumbColor={dailyReminder ? "#00e676" : "#888"}
            />
          </View>

          <Text style={styles.label}>Monthly Budget Limit (€)</Text>
          <TextInput
            value={budgetLimit}
            onChangeText={setBudgetLimit}
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#555"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
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
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#161b2e",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  label: {
    color: "#9da7c2",
    marginBottom: 6,
    fontSize: 15,
  },
  input: {
    backgroundColor: "#1f253b",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  button: {
    backgroundColor: "#00e676",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "700",
  },
});
