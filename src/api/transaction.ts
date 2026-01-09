import api from "./api";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
  outcome: "income" | "expense";
  categoryId: number;
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await api.get("/transactions");
  return res.data;
}

export async function createTransaction(data: {
  type: string;
  amount: number;
  outcome: "income" | "expense";
  note?: string;
  date?: string | null;
  timestamp?: number;
  categoryId: number;
}) {
  const res = await api.post("/transactions", {
    ...data,
    amount: Number(data.amount),
  });
  return res.data;
}

export async function updateTransaction(data: {
  id: number;
  type: string;
  amount: number;
  date: string | null;
  note?: string;
  timestamp: number;
  outcome: "income" | "expense";
  categoryId: number;
}) {
  const res = await api.patch(`/transactions/${data.id}`, data);
  return res.data;
}

export async function deleteTransactions(id: number) {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
}

export async function getSummary() {
  const res = await api.get("/transactions/summary");
  return res.data;
}