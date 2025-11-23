const API_URL = "http://localhost:3000";

export async function getTransactions() {
  const res = await fetch(`${API_URL}/transactions`);
  return res.json();
}

export async function createTransaction(data: {
  id: number;
  type: string;
  amount: number;
  category: string;
  note?: string;
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
  date: string;
  note?: string;
  timestamp: number;
  outcome: string;
}) {
   const res = await fetch(`${API_URL}/transactions/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      date: new Date(data.date) // convert to valid date for Prisma
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update transaction");
  }

  return res.json(); // return updated data from database
}
