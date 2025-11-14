import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { addTransaction } from "../../db/queries";
import { useOCR } from "../../hooks/useOCR";

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
  }, [permission?.granted, requestPermission]);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const result = await extractFromImage(photo);
      setDetectedTotal(result.total);
      setCategory(result.category);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to process receipt");
    } finally {
      setCapturing(false);
    }
  };

  const handleSave = async () => {
    if (!detectedTotal) {
      Alert.alert("No total detected");
      return;
    }
    await addTransaction({
      type: "expense",
      amount: detectedTotal,
      categoryName: category,
      description: "Receipt",
      date: new Date().toISOString(),
    });
    Alert.alert("Saved from receipt");
    router.push("/");
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Camera permission needed</Text>
        <Button title="Grant permission" onPress={requestPermission}></Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Receipt</Text>
      <View style={styles.cameraWrapper}>
        <CameraView ref={cameraRef} style={styles.camera} />
      </View>

      {capturing ? (
        <ActivityIndicator size="large" color="#4ade80" />
      ) : (
        <Button title="Capture & Detect" onPress={handleCapture} />
      )}

      <View style={styles.result}>
        <Text style={styles.label}>
          Detected Total:{" "}
          <Text style={styles.value}>
            {detectedTotal ? `€${detectedTotal.toFixed(2)}` : "—"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Suggested Category: <Text style={styles.value}>{category}</Text>
        </Text>
      </View>

      <Button
        title="Save as Expense"
        onPress={handleSave}
        disabled={!detectedTotal}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1020", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  cameraWrapper: {
    height: 260,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  camera: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b1020",
  },
  result: { marginTop: 16, marginBottom: 12 },
  label: { color: "#ccc", marginTop: 4 },
  value: { color: "#4ade80", fontWeight: "bold" },
});
