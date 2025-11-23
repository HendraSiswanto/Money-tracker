import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

function convertBigInt(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

export const transactionController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: { timestamp: "desc" },
      });

      res.json(convertBigInt(transactions));
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
          type: type,
          amount: numericAmount,
          note: note ?? "",
          date: new Date(date),
          timestamp: BigInt(timestamp),
        },
      });

      res.json(convertBigInt(newTransaction));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create data" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await prisma.transaction.delete({
        where: { id },
      });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete data" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const updated = await prisma.transaction.update({
        where: { id },
        data: {
          ...(data.type && { type: data.type }),
          ...(data.amount && { amount: data.amount }),
          ...(data.note !== undefined && { note: data.note }),
          ...(data.date && { date: new Date(data.date) }),
          ...(data.timestamp && { timestamp: data.timestamp }),
          ...(data.outcome && { outcome: data.outcome }),
          
        },
      });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Failed to update data" });
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

      res.json(
        convertBigInt({
          income: income._sum.amount || 0,
          expense: expense._sum.amount || 0,
          balance: (income._sum.amount || 0) - (expense._sum.amount || 0),
        })
      );
    } catch (err) {
      res.status(500).json({ error: "Failed to get summary" });
    }
  },
};
