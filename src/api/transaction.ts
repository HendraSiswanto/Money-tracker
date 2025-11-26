const API_URL = "http://localhost:3000";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
  outcome: "income" | "expense";
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${API_URL}/transactions`);
  return res.json();
}

export async function createTransaction(data: {
  type: string;
  amount: number;
  outcome: string;
  note?: string;
  date?: string | null;
  timestamp?: number;
}) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getSummary() {
  const res = await fetch(`${API_URL}/transactions/summary`);
  return res.json();
}

export async function deleteTransactions(id: number) {
  const res = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function updateTransaction(data: {
  id: number;
  type: string;
  amount: number;
  date: string | null;
  note?: string;
  timestamp: number;
  outcome: string;
}) {
  const safeDate =
    data.date && !isNaN(new Date(data.date).getTime())
      ? new Date(data.date)
      : undefined;

  const res = await fetch(`${API_URL}/transactions/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      date: safeDate,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update transaction");
  }

  return res.json();
}
