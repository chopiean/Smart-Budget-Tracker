import { useEffect, useState } from "react";
import {
  getAllTransactions,
  getRecentTransactions,
  TransactionRow,
} from "../db/queries";

export function useTransactions() {
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [recentTransactions, setRecentTransactionsState] = useState<
    TransactionRow[]
  >([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    const all = await getAllTransactions();
    const recent = await getRecentTransactions();
    setTransactions(all);
    setRecentTransactionsState(recent);
  };

  return { transactions, recentTransactions, refresh };
}
