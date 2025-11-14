import { openDatabase, type WebSQLDatabase } from "expo-sqlite";

let db: WebSQLDatabase | null = null;

export function getDb(): WebSQLDatabase {
  if (!db) {
    db = openDatabase("budget.db");
  }
  return db;
}

export function initDb() {
  const db = getDb();

  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        amount REAL,
        category_id INTEGER,
        description TEXT,
        date TEXT,
        receipt_id INTEGER
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        currency TEXT,
        daily_reminder INTEGER,
        budget_limit REAL
      );
    `);
  });

  console.log("📦 SQLite initialized");
}
