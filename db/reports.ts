// db/reports.ts
import { getAllTransactions, TransactionRow } from "./queries";

export type MonthlyReport = {
  month: string;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  byCategory: {
    [category: string]: number;
  };
  transactions: TransactionRow[];
};

// Format to YYYY-MM
function formatMonth(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export async function getMonthlyReports(): Promise<MonthlyReport[]> {
  const all = await getAllTransactions();

  const monthlyMap: Record<string, MonthlyReport> = {};

  for (const tx of all) {
    const monthKey = formatMonth(tx.date);

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        month: monthKey,
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
        byCategory: {},
        transactions: [],
      };
    }

    const report = monthlyMap[monthKey];

    report.transactions.push(tx);

    if (tx.type === "income") {
      report.totalIncome += tx.amount;
    } else {
      report.totalExpense += tx.amount;

      const catName = tx.category_name || "Other";
      report.byCategory[catName] =
        (report.byCategory[catName] || 0) + tx.amount;
    }
  }

  for (const key of Object.keys(monthlyMap)) {
    const r = monthlyMap[key];
    r.netBalance = r.totalIncome - r.totalExpense;
  }

  return Object.values(monthlyMap).sort((a, b) => (a.month < b.month ? 1 : -1));
}
