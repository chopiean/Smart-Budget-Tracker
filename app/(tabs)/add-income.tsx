import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { addTransaction } from "../../db/queries";

export default function AddIncomeScreen() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("Salary");
  const router = useRouter();

  const handleSave = async () => {
    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) {
      Alert.alert("Invalid amount");
      return;
    }

    await addTransaction({
      type: "income",
      amount: value,
      categoryName: source,
      description: "Income",
      date: new Date().toISOString(),
    });

    Alert.alert("Income saved");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Income</Text>

      <Text style={styles.label}>Amount (€)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Source</Text>
      <TextInput
        value={source}
        onChangeText={setSource}
        style={styles.input}
        placeholder="Salary, Bonus..."
      />

      <Button title="Save Income" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0b1020" },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 16 },
  label: { color: "#ccc", marginTop: 8 },
  input: {
    backgroundColor: "#151b32",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
});
