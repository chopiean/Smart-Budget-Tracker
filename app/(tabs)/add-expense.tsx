import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { addTransaction } from "../../db/queries";

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      Alert.alert("Invalid amount");
      return;
    }

    await addTransaction({
      type: "expense",
      amount: value,
      categoryName: category,
      description,
      date: new Date().toISOString(),
    });

    Alert.alert("Expense saved");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <Text style={styles.label}>Amount (€)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
        placeholder="Food, Transport, etc."
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Optional description"
      />

      <Button title="Save Expense" onPress={handleSave} />
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
