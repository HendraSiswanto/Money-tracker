import { useEffect, useState } from "react";
import type { Category } from "../components/types/CategoryTypes";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/category";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);

    try {
      const data = await fetchCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadCategories error:", err);
      setCategories([]);
    } finally {
      setTimeout(() => {
      setLoading(false);
    }, 500);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (data: {
    name: string;
    emote: string;
    type: "income" | "expense";
  }) => {
    const newCategory = await createCategory(data);
    setCategories((prev) => [...prev, newCategory]);
  };

  const editCategory = async (id: number, data: Partial<Category>) => {
    const updated = await updateCategory(id, data);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const removeCategory = async (id: number) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    categories,
    isLoading,
    addCategory,
    editCategory,
    removeCategory,
    reload: loadCategories,
  };
}
