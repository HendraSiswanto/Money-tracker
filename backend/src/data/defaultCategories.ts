import { CategoryType } from "@prisma/client";

export const defaultCategories = [
  { name: "Salary", emote: "💼", color: "#1C4532", type: CategoryType.income },
  { name: "Bonus", emote: "💰", color: "#1C4532", type: CategoryType.income },
  { name: "Freelance", emote: "👨‍💻", color: "#1C4532", type: CategoryType.income },
  { name: "Investment", emote: "📈", color: "#1C4532", type: CategoryType.income },
  { name: "Gift", emote: "🎁", color: "#1C4532", type: CategoryType.income },

  { name: "Food", emote: "🍔", color: "#45241cff", type: CategoryType.expense },
  { name: "Transport", emote: "🚌", color: "#45241cff", type: CategoryType.expense },
  { name: "Shopping", emote: "🛍️", color: "#45241cff", type: CategoryType.expense },
];
