import { addCategory, getCategories } from "./categories";
import { loadItem, saveItem } from "./storage";

const KEY = "transactions";

export type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  receiptId?: number;
};

export async function getTransactions(): Promise<Transaction[]> {
  return loadItem<Transaction[]>(KEY, []);
}

export async function addTransaction(tx: Omit<Transaction, "id">) {
  const transactions = await getTransactions();
  const newTx: Transaction = { ...tx, id: Date.now() };

  // ---- Save transaction ----
  transactions.push(newTx);
  await saveItem(KEY, transactions);

  // ---- Auto-create category if needed ----
  const trimmedCategory = newTx.category?.trim();

  if (trimmedCategory) {
    const existing = await getCategories();
    const exists = existing.some(
      (c) => c.name.toLowerCase() === trimmedCategory.toLowerCase()
    );

    if (!exists) {
      await addCategory(trimmedCategory);
    }
  }
}

export async function deleteTransaction(id: number) {
  const transactions = await getTransactions();
  const filtered = transactions.filter((t) => t.id !== id);

  await saveItem(KEY, filtered);
}
