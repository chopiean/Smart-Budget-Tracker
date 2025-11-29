import { getTransactions, Transaction } from "./transactions";

export type MonthlyReport = {
  month: string; // e.g. "2025-02"
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  byCategory: {
    [categoryId: number]: number; // amount spent in that category
  };
  transactions: Transaction[];
};

// Format to YYYY-MM
function formatMonth(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export async function getMonthlyReports(): Promise<MonthlyReport[]> {
  const all = await getTransactions();

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

    // Add transaction to list
    report.transactions.push(tx);

    // Income vs Expense
    if (tx.type === "income") {
      report.totalIncome += tx.amount;
    } else {
      report.totalExpense += tx.amount;

      // Category breakdown
      if (!report.byCategory[tx.categoryId]) {
        report.byCategory[tx.categoryId] = 0;
      }
      report.byCategory[tx.categoryId] += tx.amount;
    }
  }

  // Calculate net balances
  for (const key of Object.keys(monthlyMap)) {
    const r = monthlyMap[key];
    r.netBalance = r.totalIncome - r.totalExpense;
  }

  // Sort months newest → oldest
  return Object.values(monthlyMap).sort((a, b) => (a.month < b.month ? 1 : -1));
}
