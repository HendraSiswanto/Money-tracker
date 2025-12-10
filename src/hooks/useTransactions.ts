import { useState, useEffect } from "react";
import {
  createTransaction,
  deleteTransactions,
  updateTransaction,
  getTransactions,
} from "../api/transaction";
import type { Data } from "../data/types";

export type TransactionType = {
  id?: number;
  outcome: string;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
};

export type SortOption = "newest" | "oldest" | "high" | "low";
export type FilterOption = "all" | "income" | "expense";

export function useTransactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  useEffect(() => {
    loadTransactions();
  }, [sortOption, filterOption]);

  const loadTransactions = async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/transactions");
    const data: Data[] = await res.json();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    setTransactions(data ?? []);

    return () => clearTimeout(timer);
  };

  const saveTransaction = async (
    newData: TransactionType,
    typeData: "income" | "expense"
  ) => {
    setIsLoading(true);
    const isEditing = !!newData.id;
    if (!isEditing) {
      await createTransaction({
        outcome: typeData,
        type: newData.type,
        amount: newData.amount,
        note: newData.note,
        date: newData.date,
        timestamp: Date.now(),
      });
    } else {
      await updateTransaction({
        id: newData.id!,
        amount: newData.amount,
        type: newData.type,
        timestamp: Date.now(),
        outcome: typeData,
        note: newData.note,
        date: newData.date,
      });
    }
    const latest = await getTransactions();

    setTransactions(latest);

    setIsLoading(false);
  };

  const removeTransaction = async (id: number) => {
    setIsLoading(true);
    await deleteTransactions(id);
    await loadTransactions();
  };

  const sorted = [...transactions].sort((a, b) => {
    if (sortOption === "newest") return b.timestamp - a.timestamp;
    if (sortOption === "oldest") return a.timestamp - b.timestamp;
    if (sortOption === "high") return b.amount - a.amount;
    if (sortOption === "low") return a.amount - b.amount;
    return 0;
  });

  const filtered = sorted.filter((item) => {
    if (filterOption === "income") return item.outcome === "income";
    if (filterOption === "expense") return item.outcome === "expense";
    return true;
  });

  const totalIncome = filtered
    .filter((t) => t.outcome.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.outcome.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance =
    filterOption === "all"
      ? totalIncome - totalExpense
      : filterOption === "income"
      ? totalIncome
      : totalExpense;

  function getMonthYear(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}-${d.getFullYear()}`;
  }

  const currentMonthKey = getMonthYear(new Date().toISOString());
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const lastMonthKey = getMonthYear(lastMonthDate.toISOString());

  const currentMonthTransactions = transactions.filter(
    (t) => getMonthYear(t.date) === currentMonthKey
  );
  const lastMonthTransactions = transactions.filter(
    (t) => getMonthYear(t.date) === lastMonthKey
  );

  const currentIncome = currentMonthTransactions
    .filter((t) => t.outcome === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentExpense = currentMonthTransactions
    .filter((t) => t.outcome === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const lastIncome = lastMonthTransactions
    .filter((t) => t.outcome === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const lastExpense = lastMonthTransactions
    .filter((t) => t.outcome === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeGrowth =
    lastIncome === 0 ? 100 : ((currentIncome - lastIncome) / lastIncome) * 100;

  const expenseGrowth =
    lastExpense === 0
      ? 100
      : ((currentExpense - lastExpense) / lastExpense) * 100;

  const balanceGrowth =
    lastIncome - lastExpense === 0
      ? 100
      : ((currentIncome - currentExpense - (lastIncome - lastExpense)) /
          (lastIncome - lastExpense)) *
        100;

  const highestIncome =
    transactions
      .filter((t) => t.outcome.toLowerCase() === "income")
      .sort((a, b) => b.amount - a.amount)[0] || null;

  const highestExpense =
    transactions
      .filter((t) => t.outcome.toLowerCase() === "expense")
      .sort((a, b) => b.amount - a.amount)[0] || null;
  const highestBalance = (() => {
    let runningBalance = 0;
    let maxBalance = 0;

    const sortedByDate = [...transactions].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    sortedByDate.forEach((t) => {
      if (t.outcome === "income") {
        runningBalance += t.amount;
      } else {
        runningBalance -= t.amount;
      }
      if (runningBalance > maxBalance) {
        maxBalance = runningBalance;
      }
    });

    return maxBalance;
  })();

  return {
    transactions: filtered,
    isLoading,
    sortOption,
    filterOption,
    setSortOption,
    setFilterOption,
    saveTransaction,
    balance,
    totalExpense,
    totalIncome,
    removeTransaction,
    incomeGrowth,
    expenseGrowth,
    balanceGrowth,
    highestExpense,
    highestIncome,
    highestBalance
  };
}
