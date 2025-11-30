// db/queries.ts
import { db } from "./database";

export type CategoryRow = {
  id: number;
  name: string;
  icon?: string | null;
  color?: string | null;
};

export type TransactionRow = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string | null;
  date: string;
  category_id: number | null;
  category_name: string | null;
  receipt_id?: number | null;
};

// ---------- helpers ----------

// Ensure category row exists and return it
async function ensureCategory(name: string): Promise<CategoryRow> {
  await db.runAsync("INSERT OR IGNORE INTO categories (name) VALUES (?);", [
    name,
  ]);

  const row = await db.getFirstAsync<CategoryRow>(
    "SELECT * FROM categories WHERE name = ? LIMIT 1;",
    [name]
  );

  if (!row) {
    throw new Error("Failed to load category: " + name);
  }

  return row;
}

// ---------- CATEGORIES ----------

export async function addCategory(name: string): Promise<void> {
  await ensureCategory(name);
}

export async function getCategories(): Promise<CategoryRow[]> {
  const result = await db.getAllAsync<CategoryRow>(
    "SELECT * FROM categories ORDER BY name ASC;"
  );
  return result;
}

// ---------- TRANSACTIONS ----------

// Used by Add Income / Add Expense (with category NAME)
export async function addTransactionWithCategoryName(args: {
  type: "income" | "expense";
  amount: number;
  categoryName: string | null;
  description: string;
  date: string;
}): Promise<void> {
  let category_id: number | null = null;

  if (args.categoryName && args.categoryName.trim().length > 0) {
    const cat = await ensureCategory(args.categoryName.trim());
    category_id = cat.id;
  }

  await db.runAsync(
    `INSERT INTO transactions (type, amount, category_id, description, date)
     VALUES (?, ?, ?, ?, ?);`,
    [args.type, args.amount, category_id, args.description, args.date]
  );
}

// Base query used everywhere
export async function getAllTransactions(): Promise<TransactionRow[]> {
  const rows = await db.getAllAsync<TransactionRow>(
    `SELECT t.*, c.name AS category_name
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.id
       ORDER BY t.date DESC, t.id DESC;`
  );
  return rows;
}

// Alias used by older code
export async function getTransactions(): Promise<TransactionRow[]> {
  return getAllTransactions();
}

// For dashboard + hook
export async function getRecentTransactions(
  limit = 5
): Promise<TransactionRow[]> {
  const all = await getAllTransactions();
  return all.slice(0, limit);
}

// ---------- REPORT HELPERS ----------

export async function getSpendingByCategory(): Promise<
  { category: string; total: number }[]
> {
  const rows = await db.getAllAsync<{ category: string; total: number }>(
    `SELECT COALESCE(c.name, 'Other') AS category,
            SUM(t.amount) AS total
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.type = 'expense'
      GROUP BY category
      ORDER BY total DESC;`
  );
  return rows;
}
