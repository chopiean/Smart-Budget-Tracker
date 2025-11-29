import { useRouter } from "expo-router";
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
import { addTransaction } from "../../db/queries";

export default function AddIncomeScreen() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
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
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Add Income</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Amount (€)</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#555"
              style={styles.input}
            />

            <Text style={styles.label}>Source</Text>
            <TextInput
              value={source}
              onChangeText={setSource}
              placeholder="Salary, Bonus..."
              placeholderTextColor="#555"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Income</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#161b2e",
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
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
  button: {
    backgroundColor: "#00e676",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
});
