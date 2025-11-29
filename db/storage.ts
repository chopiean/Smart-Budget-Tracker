import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveItem(key: string, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadItem<T>(key: string, fallback: T): Promise<T> {
  const stored = await AsyncStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}
