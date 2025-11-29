import { loadItem, saveItem } from "./storage";

const KEY = "transactions";

export type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  categoryId: number;
  description: string;
  date: string;
  receiptId?: number;
};

export async function getTransactions(): Promise<Transaction[]> {
  return loadItem<Transaction[]>(KEY, []);
}

export async function addTransaction(tx: Omit<Transaction, "id">) {
  const transactions = await getTransactions();
  const newTx = { ...tx, id: Date.now() };

  transactions.push(newTx);
  await saveItem(KEY, transactions);
}

export async function deleteTransaction(id: number) {
  const transactions = await getTransactions();
  const filtered = transactions.filter((t) => t.id !== id);

  await saveItem(KEY, filtered);
}
