import { addCategory, Category, getCategories } from "./categories";
import { addTransaction as addTx, getTransactions } from "./transactions";

export type TransactionRow = {
  id: number;
  type: "income" | "expense";
  amount: number;
  category_id: number | null;
  description: string | null;
  date: string;
  receipt_id: number | null;
  category_name?: string;
};

type NewTransactionInput = {
  type: "income" | "expense";
  amount: number;
  categoryName: string;
  description?: string;
  date: string;
};

//--------------------------------------
// ENSURE CATEGORY
//--------------------------------------
async function ensureCategory(name: string): Promise<Category> {
  const categories = await getCategories();
  const existing = categories.find((c) => c.name === name);

  if (existing) return existing;

  await addCategory(name);
  const updated = await getCategories();
  return updated.find((c) => c.name === name)!;
}

//--------------------------------------
// ADD TRANSACTION
//--------------------------------------
export async function addTransaction(
  input: NewTransactionInput
): Promise<void> {
  const cat = await ensureCategory(input.categoryName);

  await addTx({
    type: input.type,
    amount: input.amount,
    categoryId: cat.id,
    description: input.description ?? "",
    date: input.date,
  });
}

//--------------------------------------
// GET ALL TRANSACTIONS (JOIN categories)
//--------------------------------------
export async function getAllTransactions(): Promise<TransactionRow[]> {
  const txs = await getTransactions();
  const categories = await getCategories();

  return txs
    .map((t) => {
      const cat = categories.find((c) => c.id === t.categoryId);
      return {
        id: t.id,
        type: t.type,
        amount: t.amount,
        category_id: t.categoryId,
        description: t.description,
        date: t.date,
        receipt_id: t.receiptId ?? null,
        category_name: cat?.name || null,
      } as TransactionRow;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

//--------------------------------------
// GET RECENT TRANSACTIONS
//--------------------------------------
export async function getRecentTransactions(limit: number = 5) {
  const all = await getAllTransactions();
  return all.slice(0, limit);
}
