export type Data = {
  id: number;
  outcome: string;
  type: string;
  amount: number;
  date: string;
  note?: string;
  timestamp: number;
  userId: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    type: string;
    emote: string;
    color: string;
  };
};
