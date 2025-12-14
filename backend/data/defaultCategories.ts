import { DefaultCategory } from "../src/types/category";
export const defaultCategories: Omit<DefaultCategory, "id" | "user_id" | "created_at">[] = [
  { outcome: "income", name: "Salary", emote: "💼", color: "#1C4532" },
  { outcome: "income", name: "Bonus", emote: "💰", color: "#1C4532" },
  { outcome: "income", name: "Freelance", emote: "👨‍💻", color: "#1C4532" },
  { outcome: "income", name: "Investment", emote: "📈", color: "#1C4532" },
  { outcome: "income", name: "Gift", emote: "🎁", color: "#1C4532" },

  { outcome: "expense", name: "Food", emote: "🍔", color: "#45241cff" },
  { outcome: "expense", name: "Transport", emote: "🚌", color: "#45241cff" },
  { outcome: "expense", name: "Shopping", emote: "🛍️", color: "#45241cff" }
];
