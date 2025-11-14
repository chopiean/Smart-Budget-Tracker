import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { getSettings, saveSettings } from "../../db/queries";

export default function SettingsScreen() {
  const [currency, setCurrency] = useState("€");
  const [dailyReminder, setDailyReminder] = useState(false);
  const [budgetLimit, setBudgetLimit] = useState("0");

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
      dailyReminder,
      budgetLimit: limit,
    });
    Alert.alert("Settings saved");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.label}>Currency Symbol</Text>
      <TextInput
        value={currency}
        onChangeText={setCurrency}
        style={styles.input}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Daily Reminder</Text>
        <Switch value={dailyReminder} onValueChange={setDailyReminder} />
      </View>

      <Text style={styles.label}>Monthly Budget Limit (€)</Text>
      <TextInput
        value={budgetLimit}
        onChangeText={setBudgetLimit}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <Button title="Save Settings" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1020", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  label: { color: "#ccc", marginTop: 12 },
  input: {
    backgroundColor: "#151b32",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});
