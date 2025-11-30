import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";

export let db: SQLiteDatabase;

export async function initDB() {
  db = await openDatabaseAsync("budget.db");

  await db.execAsync(`
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

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      currency TEXT DEFAULT '€',
      daily_reminder INTEGER DEFAULT 0,
      budget_limit REAL DEFAULT 0
    );

    INSERT OR IGNORE INTO settings (id) VALUES (1);
  `);
}
