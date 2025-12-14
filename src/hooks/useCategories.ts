import { useEffect, useState } from "react";
import type { Category } from "../components/types/CategoryTypes";
import { defaultCategories } from "../data/defaultCategories";

const API_URL = "http://localhost:3000";

export default function useCategories(userId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    if (!userId) return;

    const res = await fetch(`${API_URL}/categories/${userId}`);
    const data = await res.json();

    setCategories(data || []);
  };

  const seedDefaultsIfNeeded = async () => {
    if (!userId) return;

    const res = await fetch(`${API_URL}/categories/${userId}`);
    const data = await res.json();

    if (data.length === 0) {
      const payload = defaultCategories.map((cat) => ({
        ...cat,
        userId,
      }));

      await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await fetchCategories();
    }
  };

  const addCategory = async (cat: Omit<Category, "id" | "userId">) => {
    if (!userId) return;

    await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cat, userId }),
    });

    fetchCategories();
  };

  const updateCategory = async (id: number, updateData: Partial<Category>) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    fetchCategories();
  };

  const deleteCategory = async (id: number) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });

    fetchCategories();
  };

  useEffect(() => {
    if (!userId) return;

    const init = async () => {
      await seedDefaultsIfNeeded();
      await fetchCategories();
      setLoading(false);
    };

    init();
  }, [userId]);

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
