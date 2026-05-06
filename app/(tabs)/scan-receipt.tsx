import { addTransactionWithCategoryName } from "@/db/queries";
import { useOCR } from "@/hooks/useOCR";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanReceiptScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [capturing, setCapturing] = useState(false);
  const { extractFromImage } = useOCR();

  const [detectedTotal, setDetectedTotal] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("Grocery");
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission?.granted]);

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    setCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const result = await extractFromImage(photo);

      setDetectedTotal(result.total ?? null);
      setCategory(result.category ?? "Other");
    } catch {
      Alert.alert("Error", "Failed to process receipt");
    } finally {
      setCapturing(false);
    }
  };

  const handleSave = async () => {
    if (detectedTotal === null) {
      Alert.alert("No total detected");
      return;
    }

    try {
      await addTransactionWithCategoryName({
        type: "expense",
        amount: detectedTotal,
        categoryName: category,
        description: "Receipt",
        date: new Date().toISOString(),
      });

      Alert.alert("Saved from receipt!");
      router.push("/(tabs)/dashboard");
    } catch (err) {
      console.error(err);
      Alert.alert("Failed to save");
    }
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#fff", marginBottom: 10 }}>
          Camera permission needed
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Scan Receipt</Text>

        <View style={styles.cameraWrapper}>
          <CameraView ref={cameraRef} style={styles.camera} />
        </View>

        {capturing ? (
          <ActivityIndicator
            size="large"
            color="#00e676"
            style={{ marginTop: 16 }}
          />
        ) : (
          <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
            <Text style={styles.captureBtnText}>📸 Capture & Detect</Text>
          </TouchableOpacity>
        )}

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Detected Total</Text>
          <Text style={styles.resultValue}>
            {detectedTotal !== null ? `€${detectedTotal.toFixed(2)}` : "—"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            detectedTotal === null && { opacity: 0.5 },
          ]}
          disabled={detectedTotal === null}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save as Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b1020" },
  container: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },

  cameraWrapper: {
    height: 330,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1f253b",
  },
  camera: { flex: 1 },

  captureBtn: {
    backgroundColor: "#1f253b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  captureBtnText: {
    color: "#00e676",
    fontSize: 16,
    fontWeight: "600",
  },

  resultCard: {
    backgroundColor: "#161b2e",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  resultLabel: { color: "#9da7c2", fontSize: 14 },
  resultValue: {
    color: "#00e676",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },

  saveButton: {
    backgroundColor: "#00e676",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#00e676",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: "#000", fontWeight: "700" },

  center: {
    flex: 1,
    backgroundColor: "#0b1020",
    justifyContent: "center",
    alignItems: "center",
  },
});
