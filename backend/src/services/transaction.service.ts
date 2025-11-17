import { prisma } from "../utils/prisma";

export const transactionService = {
  getAll: async () => {
    return prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create: async (data: any) => {
    return prisma.transaction.create({ data });
  },

  summary: async () => {
    const income = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "income" },
    });

    const expense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "expense" },
    });

    return {
      totalIncome: income._sum.amount || 0,
      totalExpense: expense._sum.amount || 0,
      balance: (income._sum.amount || 0) - (expense._sum.amount || 0),
    };
  }
};
