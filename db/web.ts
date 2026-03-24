import AsyncStorage from "@react-native-async-storage/async-storage";

const CAT_KEY = "cats";
const TX_KEY = "txs";

export function initDB() {}

async function load(key: string, fallback: any) {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

export async function addCategory(name: string) {
  const cats = await load(CAT_KEY, []);
  if (!cats.some((c: any) => c.name === name)) {
    cats.push({ id: Date.now(), name });
    await AsyncStorage.setItem(CAT_KEY, JSON.stringify(cats));
  }
}

export async function getCategories() {
  return await load(CAT_KEY, []);
}

export async function addTransaction(data: any) {
  const txs = await load(TX_KEY, []);

  txs.push({
    id: Date.now(),
    type: data.type,
    amount: data.amount,
    category_id: data.category_id,
    description: data.description || "",
    date: data.date,
  });

  await AsyncStorage.setItem(TX_KEY, JSON.stringify(txs));
}

export async function getTransactions() {
  const txs = await load(TX_KEY, []);
  const cats = await load(CAT_KEY, []);

  return txs.map((t: any) => ({
    ...t,
    category_name: cats.find((c: any) => c.id === t.category_id)?.name || null,
  }));
}

export default {
  initDB,
  addCategory,
  getCategories,
  addTransaction,
  getTransactions,
};
