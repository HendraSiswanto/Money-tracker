import { useEffect, useState } from "react";
import type { Category } from "../components/types/CategoryTypes";

const API_URL = "http://localhost:3000";

export default function useCategories() {
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
      await fetch(`${API_URL}/categories/seed`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCategories();
    }
  };

  useEffect(() => {

    const init = async () => {
      await seedIfEmpty();
      await fetchCategories();
      setLoading(false);
    };

    init();
  }, []);

  return {
    categories,
    loading,
  };
}
