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