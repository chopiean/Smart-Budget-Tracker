import { getDB } from "./database";

/* TYPES */
export type CategoryRow = { id: number; name: string };
export type TransactionRow = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string | null;
  date: string;
  category_id: number | null;
  category_name: string | null;
};

/* CATEGORY HELPERS */
export async function ensureCategory(name: string): Promise<number | null> {
  const db = getDB();
  const clean = name.trim();
  if (!clean) return null;

  await db.runAsync("INSERT OR IGNORE INTO categories (name) VALUES (?);", [
    clean,
  ]);

  const row = await db.getFirstAsync<CategoryRow>(
    "SELECT id, name FROM categories WHERE name = ?;",
    [clean]
  );

  return row?.id ?? null;
}

export async function getCategories(): Promise<CategoryRow[]> {
  const db = getDB();
  return await db.getAllAsync<CategoryRow>(
    "SELECT id, name FROM categories ORDER BY name ASC;"
  );
}

/* TRANSACTIONS */
export async function addTransaction(data: {
  type: "income" | "expense";
  amount: number;
  category_id: number | null;
  description: string;
  date: string;
}): Promise<void> {
  const db = getDB();
  await db.runAsync(
    `INSERT INTO transactions (type, amount, category_id, description, date)
     VALUES (?, ?, ?, ?, ?);`,
    [data.type, data.amount, data.category_id, data.description, data.date]
  );
}

export async function addTransactionWithCategoryName(data: {
  type: "income" | "expense";
  amount: number;
  categoryName: string;
  description: string;
  date: string;
}): Promise<void> {
  const categoryId = await ensureCategory(data.categoryName);
  await addTransaction({
    type: data.type,
    amount: data.amount,
    category_id: categoryId,
    description: data.description,
    date: data.date,
  });
}

/* QUERIES */
export async function getAllTransactions(): Promise<TransactionRow[]> {
  const db = getDB();
  return await db.getAllAsync<TransactionRow>(
    `SELECT t.*, c.name AS category_name
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     ORDER BY t.date DESC, t.id DESC;`
  );
}

export async function getRecentTransactions(): Promise<TransactionRow[]> {
  const db = getDB();
  return await db.getAllAsync<TransactionRow>(
    `SELECT t.*, c.name AS category_name
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     ORDER BY t.date DESC, t.id DESC
     LIMIT 5;`
  );
}

export async function getSpendingByCategory(): Promise<
  { category: string; total: number }[]
> {
  const db = getDB();
  return await db.getAllAsync<{ category: string; total: number }>(
    `SELECT c.name AS category, SUM(t.amount) AS total
     FROM transactions t
     JOIN categories c ON t.category_id = c.id
     WHERE t.type = 'expense'
     GROUP BY t.category_id
     ORDER BY total DESC;`
  );
}
