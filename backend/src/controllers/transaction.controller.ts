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
      const userId = _req.userId;
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
        orderBy: { timestamp: "desc" },
      });

      res.json(convertBigInt(transactions));
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { outcome, type, amount, note, date, timestamp, categoryId } =
        req.body;

      if (!req.userId || !categoryId) {
        return res.status(400).json({ error: "Missing userId or categoryId" });
      }

      if (!outcome || !type) {
        return res.status(400).json({ error: "Missing outcome or type" });
      }

      if (amount === undefined || isNaN(Number(amount))) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const newTransaction = await prisma.transaction.create({
        data: {
          outcome,
          type,
          amount: Number(amount),
          note: note ?? "",
          date: date ? new Date(date) : new Date(),
          timestamp: timestamp ? BigInt(timestamp) : BigInt(Date.now()),
          userId: req.userId,
          categoryId,
        },
      });

      res.json(convertBigInt(newTransaction));
    } catch (err) {
      console.error("CREATE TRANSACTION ERROR:", err);
      res.status(500).json({ error: "Failed to create transaction" });
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

      const existing = await prisma.transaction.findUnique({
        where: { id },
      });

      if (!existing) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      const { amount, note, date, outcome, type, timestamp, categoryId } =
        req.body;

      const updated = await prisma.transaction.update({
        where: { id },
        data: {
          amount: amount !== undefined ? Number(amount) : existing.amount,
          note: note ?? existing.note,
          date: date ? new Date(date) : existing.date,
          outcome: outcome ?? existing.outcome,
          type: type ?? existing.type,
          timestamp: timestamp ? BigInt(timestamp) : existing.timestamp,
          categoryId,
        },
      });

      res.json(convertBigInt(updated));
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to update data" });
    }
  },
  summary: async (_req: Request, res: Response) => {
    try {
      const userId = _req.userId;
      if (!userId) return res.status(400).json({ error: "Missing userId" });
      const income = await prisma.transaction.aggregate({
        where: { userId, type: "Income" },
        _sum: { amount: true },
      });

      const expense = await prisma.transaction.aggregate({
        where: { userId, type: "Expense" },
        _sum: { amount: true },
      });

      res.json(
        convertBigInt({
          income: income._sum.amount || 0,
          expense: expense._sum.amount || 0,
          balance:
            Number(income._sum.amount || 0) - Number(expense._sum.amount || 0),
        })
      );
    } catch (err) {
      res.status(500).json({ error: "Failed to get summary" });
    }
  },
};
