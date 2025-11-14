// hooks/useBudget.ts
import { useEffect, useState } from "react";
import { getAllTransactions, TransactionRow } from "../db/queries";
import { startOfMonthISO } from "../utils/date";

type CategorySummary = { name: string; value: number };
type MonthlyPoint = { label: string; value: number };

export function useBudget() {
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [byCategory, setByCategory] = useState<CategorySummary[]>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyPoint[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAllTransactions();
      setTransactions(data);
      computeSummaries(data);
    })();
  }, []);

  const computeSummaries = (rows: TransactionRow[]) => {
    let income = 0;
    let expense = 0;
    const catMap: Record<string, number> = {};
    const trendMap: Record<string, number> = {};

    const monthStart = startOfMonthISO();

    for (const row of rows) {
      const amount = row.amount;
      const isThisMonth = row.date >= monthStart;
      if (row.type === "income") {
        income += amount;
      } else {
        expense += amount;
        if (isThisMonth) {
          const catName = row.category_name || "Other";
          catMap[catName] = (catMap[catName] || 0) + amount;
        }
      }

      // trend by YYYY-MM
      const monthLabel = row.date.slice(0, 7);
      if (row.type === "expense") {
        trendMap[monthLabel] = (trendMap[monthLabel] || 0) + amount;
      }
    }

    setTotalIncome(income);
    setTotalExpense(expense);
    setByCategory(
      Object.entries(catMap).map(([name, value]) => ({ name, value }))
    );
    setMonthlyTrend(
      Object.entries(trendMap)
        .sort(([a], [b]) => (a < b ? -1 : 1))
        .map(([label, value]) => ({ label, value }))
    );
  };

  const totalBalance = totalIncome - totalExpense;

  return {
    transactions,
    totalIncome,
    totalExpense,
    totalBalance,
    byCategory,
    monthlyTrend,
  };
}
