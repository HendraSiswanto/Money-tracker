import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const transactionController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: { timestamp: "desc" },
      });

      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { outcome, type, amount, note, date, timestamp } = req.body;

      const numericAmount = parseInt(String(amount).replace(/\D/g, ""));

      const newTransaction = await prisma.transaction.create({
        data: {
            outcome,
          type: outcome,
          category: type,
          amount: numericAmount,
          note: note ?? "",
          date: new Date(date),  
          timestamp: BigInt(timestamp), 
        },
      });

      res.json(newTransaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create data" });
    }
  },

  summary: async (_req: Request, res: Response) => {
    try {
      const income = await prisma.transaction.aggregate({
        where: { type: "Income" },
        _sum: { amount: true },
      });

      const expense = await prisma.transaction.aggregate({
        where: { type: "Expense" },
        _sum: { amount: true },
      });

      res.json({
        income: income._sum.amount || 0,
        expense: expense._sum.amount || 0,
        balance: (income._sum.amount || 0) - (expense._sum.amount || 0),
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to get summary" });
    }
  },
};
