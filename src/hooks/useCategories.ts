import { useEffect, useState } from "react";
import type { Category } from "../components/types/CategoryTypes";

const API_URL = "http://localhost:3000";

export default function useCategories(userId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCategories(data);
  };

  const seedIfEmpty = async () => {
    const res = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.length === 0) {
       const userId = localStorage.getItem("userId");
      await fetch(`${API_URL}/categories/seed/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify({ userId }),
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
