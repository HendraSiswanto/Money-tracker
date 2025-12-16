import { useEffect, useState } from "react";
import type { Category } from "../components/types/CategoryTypes";

const API_URL = "http://localhost:3000";

export default function useCategories(userId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchCategories = async () => {
    if (!userId) return;

    const res = await fetch(`${API_URL}/categories/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCategories(data);
  };

  const seedIfEmpty = async () => {
    if (!userId) return;

    const res = await fetch(`${API_URL}/categories/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.length === 0) {
      await fetch(`${API_URL}/categories/seed/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCategories();
    }
  };

  useEffect(() => {
    if (!userId) return;

    const init = async () => {
      await seedIfEmpty();
      await fetchCategories();
      setLoading(false);
    };

    init();
  }, [userId]);

  return {
    categories,
    loading,
  };
}
