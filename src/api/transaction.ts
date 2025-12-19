const API_URL = "http://localhost:3000";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
  outcome: "income" | "expense";
  userId: string;
  categoryId: number;
}

export async function getTransactions(): Promise<Transaction[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function createTransaction(data: {
  type: string;
  amount: number;
  outcome: string;
  note?: string;
  date?: string | null;
  timestamp?: number;

  categoryId: number;
}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      amount: Number(data.amount),
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Create transaction failed");
  }
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
  categoryId: number;
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
