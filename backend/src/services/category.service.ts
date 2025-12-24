import { prisma } from "../utils/prisma";
import { CategoryType } from "@prisma/client";

export const CategoryService = {
  getAll: async (userId: string) => {
    const categories = await prisma.category.findMany({
      where: { userId },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      emote: cat.emote,
      type: cat.type,
      color: cat.color,
      isUsed: cat._count.transactions > 0,
    }));
  },
  async seedDefaults(
    userId: string,
    defaults: {
      name: string;
      emote: string;
      type: CategoryType;
      color?: string | null;
    }[]
  ) {
    await prisma.category.createMany({
      data: defaults.map((d) => ({
        ...d,
        userId,
      })),
    });
  },

  create: (data: {
    userId: string;
    name: string;
    emote: string;
    type: CategoryType;
    color?: string | null;
  }) => {
    return prisma.category.create({
      data: {
        userId: data.userId,
        name: data.name,
        emote: data.emote,
        type: data.type,
        color: data.color ?? "",
      },
    });
  },

  update: (id: number, data: any) => {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    const used = await prisma.transaction.count({
      where: { categoryId: id },
    });

    if (used > 0) {
      throw new Error("CATEGORY_IN_USE");
    }

    return prisma.category.delete({ where: { id } });
  },
};
