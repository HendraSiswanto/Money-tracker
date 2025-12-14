export interface Category {
  id: number;
  name: string;
  outcome: "income" | "expense"; // category type
  emote?: string; // optional, depends on your defaultCategories
  user_id: string;
  color: string
}
