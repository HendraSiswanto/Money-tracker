import { useEffect, useState } from "react";
import type { Category } from "../components/types/CategoryTypes";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const init = async () => {
      await fetch("http://localhost:3000/categories/seed", {
        method: "POST",
        headers,
      });

      const res = await fetch("http://localhost:3000/categories", { headers });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    };

    init();
  }, []);

  return { categories, loading };
}
