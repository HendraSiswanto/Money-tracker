const API_URL = import.meta.env.VITE_API_URL;

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
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/transactions/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function deleteTransactions(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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
  const token = localStorage.getItem("token");
  const safeDate =
    data.date && !isNaN(new Date(data.date).getTime())
      ? new Date(data.date)
      : undefined;

  const res = await fetch(`${API_URL}/transactions/${data.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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
