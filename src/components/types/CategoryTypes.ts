export interface Category {
  id: number;
  name: string;
  outcome: "income" | "expense"; 
  emote?: string; 
  user_id: string;
  color: string
}
