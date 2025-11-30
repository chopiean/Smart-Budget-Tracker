// db/settings.ts
import { db } from "./database";

export type AppSettings = {
  currency: string;
  daily_reminder: boolean;
  budget_limit: number;
};

export async function getSettings(): Promise<AppSettings | null> {
  const rows = await db.getAllAsync<any>("SELECT * FROM settings LIMIT 1;");
  if (rows.length === 0) return null;

  const s = rows[0];
  return {
    currency: s.currency,
    daily_reminder: Boolean(s.daily_reminder),
    budget_limit: s.budget_limit,
  };
}

export async function saveSettings(s: AppSettings): Promise<void> {
  await db.runAsync(
    `
    INSERT INTO settings (id, currency, daily_reminder, budget_limit)
    VALUES (1, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      currency = excluded.currency,
      daily_reminder = excluded.daily_reminder,
      budget_limit = excluded.budget_limit;
  `,
    [s.currency, s.daily_reminder ? 1 : 0, s.budget_limit]
  );
}
