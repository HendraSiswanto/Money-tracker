const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(data: {
  name: string;
  emote: string;
  type: "income" | "expense";
}) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(
  id: number,
  data: Partial<{
    name: string;
    emote: string;
    type: string;
  }>
) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
