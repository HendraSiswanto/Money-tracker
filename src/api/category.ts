import api from "./api";
import type { CategoryType } from "../components/types/CategoryTypes";


export type CategoryPayload = {
  name: string;
  emote: string;
  type: CategoryType;
};

export async function fetchCategories() {
  const res = await api.get("/categories");
  return res.data;
}

export async function createCategory(data: CategoryPayload) {
  const res = await api.post("/categories", data);
  return res.data;
}

export async function updateCategory(
  id: number,
  data: Partial<CategoryPayload>
) {
  const res = await api.patch(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: number) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}