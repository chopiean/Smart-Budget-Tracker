import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";

const db: SQLiteDatabase = openDatabaseSync("budget.db");

export function initDB() {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      category_id INTEGER,
      description TEXT,
      date TEXT NOT NULL,
      FOREIGN KEY(category_id) REFERENCES categories(id)
    );
  `);
}

export async function addCategory(name: string) {
  await db.runAsync("INSERT OR IGNORE INTO categories (name) VALUES (?);", [
    name,
  ]);
}

export async function getCategories() {
  return await db.getAllAsync("SELECT * FROM categories ORDER BY name ASC;");
}

export async function addTransaction(data: {
  type: "income" | "expense";
  amount: number;
  category_id: number | null;
  description: string;
  date: string;
}) {
  await db.runAsync(
    `INSERT INTO transactions (type, amount, category_id, description, date)
     VALUES (?, ?, ?, ?, ?);`,
    [data.type, data.amount, data.category_id, data.description, data.date]
  );
}

export async function getTransactions() {
  return await db.getAllAsync(`
    SELECT t.*, c.name AS category_name 
    FROM transactions t
    LEFT JOIN categories c ON c.id = t.category_id
    ORDER BY t.date DESC
  `);
}

export default {
  initDB,
  addCategory,
  getCategories,
  addTransaction,
  getTransactions,
};
