import { addTransactionWithCategoryName } from "@/db/queries";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddExpenseScreen() {
  const nav = useNavigation();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  async function saveExpense() {
    if (!amount) return Alert.alert("Missing amount");
    if (!category) return Alert.alert("Missing category");

    const value = parseFloat(amount);
    if (isNaN(value)) return Alert.alert("Invalid amount");

    try {
      await addTransactionWithCategoryName({
        type: "expense",
        amount: value,
        categoryName: category.trim(),
        description: description || "",
        date: new Date().toISOString(),
      });

      Alert.alert("Success", "Expense saved!");
      nav.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving expense");
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Add Expense</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Amount (€)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#555"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Food, Transport, etc."
              placeholderTextColor="#555"
              value={category}
              onChangeText={setCategory}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Optional description"
              placeholderTextColor="#555"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={saveExpense}>
            <Text style={styles.buttonText}>Save Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b1020" },
  container: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#161b2e",
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
  },
  label: { color: "#9da7c2", marginBottom: 6, fontSize: 15 },
  input: {
    backgroundColor: "#1f253b",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 18,
  },
  button: {
    backgroundColor: "#00e676",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#000", fontSize: 16, fontWeight: "700" },
});
