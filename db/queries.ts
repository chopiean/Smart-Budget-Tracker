import { getDb } from "./db";

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

export type SettingsRow = {
  id: number;
  currency: string | null;
  daily_reminder: number | null;
  budget_limit: number | null;
};

type NewTransactionInput = {
  type: "income" | "expense";
  amount: number;
  categoryName: string;
  description?: string;
  date: string;
};

//--------------------------------------
// ADD TRANSACTION
//--------------------------------------
export function addTransaction(input: NewTransactionInput): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const db = getDb();
    const categoryId = await ensureCategory(input.categoryName);

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transactions (type, amount, category_id, description, date)
         VALUES (?, ?, ?, ?, ?)`,
        [
          input.type,
          input.amount,
          categoryId,
          input.description ?? null,
          input.date,
        ],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
}

//--------------------------------------
// GET ALL TRANSACTIONS
//--------------------------------------
export function getAllTransactions(): Promise<TransactionRow[]> {
  return new Promise((resolve, reject) => {
    const db = getDb();

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT t.*, c.name AS category_name
         FROM transactions t
         LEFT JOIN categories c ON t.category_id = c.id
         ORDER BY date DESC`,
        [],
        (_, result) => resolve(result.rows._array as TransactionRow[]),
        (_, err) => reject(err)
      );
    });
  });
}

function ensureCategory(name: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const db = getDb();

    db.transaction((tx) => {
      // Check for existing
      tx.executeSql(
        `SELECT id FROM categories WHERE name = ? LIMIT 1`,
        [name],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0).id);
          } else {
            // Insert new category
            tx.executeSql(
              `INSERT INTO categories (name) VALUES (?)`,
              [name],
              (_, res) => resolve(res.insertId!),
              (_, err) => reject(err)
            );
          }
        },
        (_, err) => reject(err)
      );
    });
  });
}
